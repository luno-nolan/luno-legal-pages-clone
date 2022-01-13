import { ContentfulClientApi, createClient, Entry } from 'contentful'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'

import { PageTemplate } from '../components/page-template'
import { RouteNotFound } from '../lib/errors/route-not-found'
import { useLocale } from '../lib/hooks/use-locale'
import { Page } from '../lib/models/page'
import { Path } from '../lib/models/path'
import { Route } from '../lib/models/route'
import { Locale } from '../lib/utils/locale'

interface PageProps {
  locale?: Locale
  page?: Entry<Page>
  preview: boolean
}

interface PageQuery extends ParsedUrlQuery {
  slug?: string[]
}

const ContentPage: NextPage<PageProps> = ({ locale, page, preview }) => {
  const { setLocale } = useLocale()
  useEffect(() => {
    if (!locale) {
      return
    }

    setLocale(locale)
  }, [locale, setLocale])

  if (!page) {
    return <div>...loading</div>
  }

  return (
    <>
      {preview && (
        <h1 style={{ color: 'red' }}>this site is in preview mode</h1>
      )}
      <PageTemplate page={page} />
    </>
  )
}

export default ContentPage

export const getStaticPaths: GetStaticPaths<PageQuery> = async () => {
  const client = configureContentfulClient()
  const paths = await getPaths(client)

  return {
    fallback: true,
    paths,
  }
}

const getPaths = async (client: ContentfulClientApi): Promise<Path[]> => {
  const paths = await getRoutePaths(client)

  return paths.reduce<Path[]>((paths, path) => {
    const slug = buildSlug(path)

    return [
      ...paths,
      {
        locale: Locale.EN_US,
        params: { slug },
      },
      {
        locale: Locale.ID_ID,
        params: { slug },
      },
    ]
  }, [])
}

const getRoutePaths = async (
  client: ContentfulClientApi
): Promise<string[]> => {
  const routes = await client.getEntries<Route>({
    content_type: 'route',
    select: 'fields.path',
  })

  return routes.items.map((item) => item.fields.path)
}

const buildSlug = (path: string): string[] => {
  return path.split('/').filter(Boolean)
}

export const getStaticProps: GetStaticProps<PageProps, PageQuery> = async ({
  params,
  preview,
  locale,
}) => {
  if (!params) {
    throw new Error('params must be provided')
  }

  const localeOrDefault = getLocaleOrDefault(locale)

  const client = configureContentfulClient(preview)
  const path = buildPath(params.slug)
  try {
    const page = await getPage(client, path, localeOrDefault)

    return {
      props: {
        locale: localeOrDefault,
        page,
        preview: !!preview,
      },
    }
  } catch (error) {
    if (error instanceof RouteNotFound) {
      return {
        notFound: true,
      }
    }

    throw error
  }
}

const getLocaleOrDefault = (locale: string = ''): Locale => {
  switch (locale.toLowerCase()) {
    case 'en-us':
      return Locale.EN_US
    case 'id-id':
      return Locale.ID_ID
    default:
      return Locale.EN_US
  }
}

const getPage = async (
  client: ContentfulClientApi,
  path: string,
  locale?: string
): Promise<Entry<Page>> => {
  const resolutionDepth = 10
  const routes = await client.getEntries<Route>({
    content_type: 'route',
    'fields.path': path,
    include: resolutionDepth,
    locale,
  })

  if (!routes.items.length) {
    throw new RouteNotFound(path)
  }

  return routes.items[0].fields.page
}

const buildPath = (slug?: string[]): string => {
  if (!slug) {
    return '/'
  }

  return ['', ...slug].join('/')
}

const configureContentfulClient = (preview: boolean = false) => {
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN
  const host = preview ? process.env.CONTENTFUL_PREVIEW_HOST : undefined

  return createClient({
    accessToken: accessToken ?? '',
    host,
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
  })
}
