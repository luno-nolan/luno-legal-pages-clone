import React from 'react'
import { Entry } from 'contentful'
import NextLink from 'next/link'

import { Link as Model } from '../lib/models/link'

interface LinkProps {
  link: Entry<Model>
}

export const Link: React.FC<LinkProps> = ({ link }) => {
  const { title, url } = link.fields

  return <NextLink href={url}>{title}</NextLink>
}
