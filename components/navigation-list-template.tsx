import { Entry } from 'contentful'
import React from 'react'

import { NavigationList } from '../lib/models/navigation-list'
import { Link } from './link'

interface NavigationListProps {
  nav: Entry<NavigationList>
}

export const NavigationListTemplate: React.FC<NavigationListProps> = ({
  nav,
}) => {
  const { links, title } = nav.fields

  return (
    <nav>
      <h1>{title}</h1>
      <ul>
        {links.map((link, idx) => (
          <li key={idx}>
            <Link link={link} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
