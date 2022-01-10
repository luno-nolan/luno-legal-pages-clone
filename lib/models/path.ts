import { Locale } from '../utils/locale'

export interface Path {
  locale: Locale
  params: {
    slug: string[]
  }
}
