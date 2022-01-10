import { Entry } from 'contentful'

import { Page } from './page'

export interface Route {
  description: string
  path: string
  page: Entry<Page>
}
