import { Entry } from 'contentful'

import { Article } from './article'
import { NavigationList } from './navigation-list'

export interface Page {
  title: string
  subtitle: string
  main: Entry<Article>[]
  aside: Entry<NavigationList>[]
}
