import { Entry } from 'contentful'
import React from 'react'

import { Page } from '../lib/models/page'

interface PageProps {
  page: Entry<Page>
}

export const PageTemplate: React.FC<PageProps> = ({ page }) => {
  return (
    <>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </>
  )
}
