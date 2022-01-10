import { Entry } from 'contentful'
import React from 'react'

import { NavigationList } from '../lib/models/navigation-list'

interface NavigationListProps {
  nav: Entry<NavigationList>
}

export const NavigationListTemplate: React.FC<NavigationListProps> = ({
  nav,
}) => {
  const { fields } = nav

  return (
    <nav>
      <h1>{fields.title}</h1>
    </nav>
  )
}
