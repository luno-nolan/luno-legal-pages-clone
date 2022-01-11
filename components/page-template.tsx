import { Entry } from 'contentful'
import { DateTime } from 'luxon'
import NextHead from 'next/head'
import React from 'react'

import { Box, Container, Typography } from '@mui/material'

import { useLocale } from '../lib/hooks/use-locale'
import { Page } from '../lib/models/page'
import { ArticleTemplate } from './article-template'
import { Footer } from './footer'
import { NavigationListTemplate } from './navigation-list-template'

interface PageProps {
  page: Entry<Page>
}

export const PageTemplate: React.FC<PageProps> = ({ page }) => {
  const { locale } = useLocale()
  const { fields, sys } = page

  const lastUpdatedAt = DateTime.fromISO(sys.updatedAt, { locale })
  const lastUpdatedAtText = `${
    fields.lastUpdatedAt
  }: ${lastUpdatedAt.toLocaleString(DateTime.DATE_FULL)}`

  return (
    <>
      <NextHead>
        <title>{fields.title}</title>
        <meta name="description" content={fields.description} />
      </NextHead>
      <Box
        component="header"
        sx={{
          backgroundColor: 'lunoblue.main',
          color: 'lunoblue.contrastText',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: '2rem', fontWeight: 800, lineHeight: '2.5rem' }}
        >
          {fields.heading}
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: '2rem' }}
        >
          {fields.subHeading}
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          padding: 2,
        }}
      >
        <Box
          component="time"
          sx={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          {lastUpdatedAtText}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexFlow: {
              xs: 'column nowrap',
              sm: 'row nowrap',
            },
          }}
        >
          <Box
            component="main"
            sx={{
              margin: {
                xs: '0 0 1rem 0',
                sm: '0 1rem 0 0',
              },
            }}
          >
            {fields.main.map((article) => (
              <ArticleTemplate article={article} key={article.sys.id} />
            ))}
          </Box>
          <aside>
            {fields.aside.map((nav) => (
              <NavigationListTemplate key={nav.sys.id} nav={nav} />
            ))}
          </aside>
        </Box>
        <Footer />
      </Container>
    </>
  )
}
