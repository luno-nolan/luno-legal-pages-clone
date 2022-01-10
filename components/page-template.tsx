import { Entry } from 'contentful'
import React from 'react'

import { Page } from '../lib/models/page'
import { ArticleTemplate } from './article-template'
import { NavigationListTemplate } from './navigation-list-template'

interface PageProps {
  page: Entry<Page>
}

export const PageTemplate: React.FC<PageProps> = ({ page }) => {
  const { fields } = page
  return (
    <>
      <header>
        <h1>{fields.title}</h1>
        <h2>{fields.subtitle}</h2>
      </header>
      <main>
        {fields.main.map((article) => (
          <ArticleTemplate article={article} key={article.sys.id} />
        ))}
      </main>
      <aside>
        {fields.aside.map((nav) => (
          <NavigationListTemplate key={nav.sys.id} nav={nav} />
        ))}
      </aside>
    </>
  )
}
