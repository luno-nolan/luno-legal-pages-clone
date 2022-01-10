import { ContentfulClientApi, createClient, Entry } from 'contentful'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { PageTemplate } from '../components/page-template'
import { Page } from '../lib/models/page'
import { Path } from '../lib/models/path'
import { Route } from '../lib/models/route'

interface PageProps {
  page?: Entry<Page>
  preview: boolean
}

interface PageQuery extends ParsedUrlQuery {
  slug?: string[]
}

const ContentPage: NextPage<PageProps> = ({ page, preview }) => {
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

  return paths.map((path) => {
    return {
      params: {
        slug: buildSlug(path),
      },
    }
  })
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
}) => {
  if (!params) {
    throw new Error('params must be provided')
  }

  const client = configureContentfulClient(preview)
  const path = buildPath(params.slug)
  const page = await getPage(client, path)

  return {
    props: {
      page,
      preview: !!preview,
    },
  }
}

const getPage = async (
  client: ContentfulClientApi,
  path: string
): Promise<Entry<Page>> => {
  const resolutionDepth = 10
  const routes = await client.getEntries<Route>({
    content_type: 'route',
    'fields.path': path,
    include: resolutionDepth,
  })

  if (!routes.items.length) {
    throw new Error(`could not find a route entry with path "${path}"`)
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
