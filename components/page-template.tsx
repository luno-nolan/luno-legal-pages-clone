import { Entry } from 'contentful'
import React from 'react'

import { Box, Container } from '@mui/material'

import { Page } from '../lib/models/page'
import { ArticleTemplate } from './article-template'
import { NavigationListTemplate } from './navigation-list-template'

interface PageProps {
  page: Entry<Page>
}

export const PageTemplate: React.FC<PageProps> = ({ page }) => {
  const { fields } = page
  return (
    <Container maxWidth="md">
      <Box
        component="header"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexFlow: 'column nowrap',
        }}
      >
        <h1>{fields.title}</h1>
        <h2>{fields.subtitle}</h2>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
        }}
      >
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
      </Box>
    </Container>
  )
}
