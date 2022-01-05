import { client } from '../client'
import { Route } from '../models/route'

export const getPage = async (path: string): Promise<unknown> => {
  const routes = await client.getEntries<Route>({
    content_type: 'route',
    'fields.path': path,
  })

  if (!routes.items.length) {
    throw new Error(`could not find a route entry with path "${path}"`)
  }

  return routes.items[0].fields.page
}
