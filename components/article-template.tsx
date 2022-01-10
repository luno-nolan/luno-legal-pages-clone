import { Entry } from 'contentful'
import React from 'react'

import { Article } from '../lib/models/article'

interface ArticleProps {
  article: Entry<Article>
}

export const ArticleTemplate: React.FC<ArticleProps> = ({ article }) => {
  const { fields } = article
  return (
    <article>
      <h1>{fields.title}</h1>
      <p>{fields.content}</p>
    </article>
  )
}
