import { Entry } from 'contentful'

import { Link } from './link'

export interface NavigationList {
  title: string
  links: Entry<Link>[]
}
