import { client } from '../client'
import { Route } from '../models/route'

export const getPaths = async (): Promise<string[]> => {
  const routes = await client.getEntries<Route>({
    content_type: 'route',
    select: 'fields.path',
  })

  return routes.items.map((item) => item.fields.path)
}
