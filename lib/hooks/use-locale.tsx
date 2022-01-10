import React from 'react'

import { Locale } from '../utils/locale'

const LocaleContext = React.createContext({
  locale: Locale.EN_US,
  setLocale: (_: Locale): void => {},
})

export const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = React.useState(Locale.EN_US)

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => React.useContext(LocaleContext)
