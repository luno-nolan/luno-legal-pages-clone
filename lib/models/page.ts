import { Entry } from 'contentful'

import { Article } from './article'
import { NavigationList } from './navigation-list'

export interface Page {
  // SEO Fields
  title: string
  description: string

  // Buldge
  heading: string
  subHeading: string

  // Content
  main: Entry<Article>[]
  aside: Entry<NavigationList>[]
}
