import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {}

  interface Palette {
    lunoblue: Palette['primary']
  }
  interface PaletteOptions {
    lunoblue: PaletteOptions['primary']
  }

  interface PaletteColor {
    darker?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
  interface ThemeOptions {}
}

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-display: swap;
          font-family: 'Fracktif';
          font-style: normal;
          font-weight: 400;
          letter-spacing: normal;
          src: url('/static/fonts/Fracktif-Regular.woff2') format('woff2');
        }
        @font-face {
          font-display: swap;
          font-family: 'Fracktif';
          font-style: normal;
          font-weight: 800;
          letter-spacing: normal;
          @include url('/static/fonts/Fracktif-ExtraBold.woff2') format('woff2');
        }
      `,
    },
  },
  palette: {
    background: {
      default: '#fafafa',
    },
    lunoblue: {
      main: '#071278',
      contrastText: '#fff',
    },
    mode: 'light',
    text: {
      primary: '#071278',
    },
  },
  typography: {
    fontFamily: [
      'Fracktif',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].toString(),
  },
})

export default theme
