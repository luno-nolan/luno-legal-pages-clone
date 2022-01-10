import { Entry } from 'contentful'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkGFM from 'remark-gfm'

import { Article } from '../lib/models/article'

interface ArticleProps {
  article: Entry<Article>
}

export const ArticleTemplate: React.FC<ArticleProps> = ({ article }) => {
  const { fields } = article
  return (
    <article>
      <h1>{fields.title}</h1>
      <ReactMarkdown remarkPlugins={[RemarkGFM]}>
        {fields.content}
      </ReactMarkdown>
    </article>
  )
}
