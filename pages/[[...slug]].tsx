import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getPage } from '../lib/contentful/services/get-page'

import { getPaths } from '../lib/contentful/services/get-paths'

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
  const urls = await getPaths()
  const slugs = urls.map((path) => {
    return {
      params: {
        slug: buildSlug(path),
      },
    }
  })

  return {
    fallback: true,
    paths: slugs,
  }
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

const buildPath = (slug?: string[]): string => {
  if (!slug) {
    return '/'
  }

  return ['', ...slug].join('/')
}

const buildSlug = (path: string): string[] => {
  return path.split('/').filter(Boolean)
}
