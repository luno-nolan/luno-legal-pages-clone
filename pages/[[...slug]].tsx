import { createClient } from 'contentful'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { Path } from '../lib/models/path'
import { Route } from '../lib/models/route'

export const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  host: process.env.CONTENTFUL_HOST,
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
})

interface PageProps {
  page?: unknown
}

interface PageQuery extends ParsedUrlQuery {
  slug?: string[]
}

const ContentPage: NextPage<PageProps> = ({ page }) => {
  if (!page) {
    return <div>...loading</div>
  }

  return (
    <>
      <h1>this is a content page</h1>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </>
  )
}

export default ContentPage

export const getStaticPaths: GetStaticPaths<PageQuery> = async () => {
  const paths = await getPaths()

  return {
    fallback: true,
    paths,
  }
}

const getPaths = async (): Promise<Path[]> => {
  const paths = await getRoutePaths()

  return paths.map((path) => {
    return {
      params: {
        slug: buildSlug(path),
      },
    }
  })
}

const getRoutePaths = async (): Promise<string[]> => {
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
}) => {
  if (!params) {
    throw new Error('params must be provided')
  }

  const path = buildPath(params.slug)
  const page = await getPage(path)

  return {
    props: {
      page,
    },
  }
}

const getPage = async (path: string): Promise<unknown> => {
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
