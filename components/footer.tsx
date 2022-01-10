import React from 'react'
import { useRouter } from 'next/router'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { useLocale } from '../lib/hooks/use-locale'
import { Locale } from '../lib/utils/locale'

export const Footer: React.FC = () => {
  const { locale, setLocale } = useLocale()
  const router = useRouter()
  const { pathname, asPath, query } = router

  const handleChange = (event: SelectChangeEvent<Locale>) => {
    const locale = event.target.value as Locale
    setLocale(locale)
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <Box component="footer">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={locale}
          label="Language"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={Locale.EN_US}>English</MenuItem>
          <MenuItem value={Locale.ID_ID}>Indonesia</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
