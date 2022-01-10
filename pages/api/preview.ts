import { createClient } from 'contentful'
import type { NextApiHandler } from 'next'

import { Route } from '../../lib/models/route'

export const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
})

const handler: NextApiHandler = async (req, res) => {
  const secret = process.env.CONTENTFUL_PREVIEW_SECRET
  if (!secret) {
    res.status(500).json({ message: 'CONTENTFUL_PREVIEW_SECRET is not set' })
    return
  }

  const { route_id, preview_secret } = req.query

  if (secret !== preview_secret) {
    res.status(401).json({ message: 'Invalid preview_secret' })
    return
  }

  if (typeof route_id !== 'string' || route_id.length === 0) {
    res.status(400).json({ message: 'Invalid route_id' })
    return
  }

  const route = await client.getEntry<Route>(route_id)
  if (!route) {
    res.status(400).json({ message: 'Invalid route_id' })
    return
  }

  res.setPreviewData({})
  res.redirect(route.fields.path)
}

export default handler
