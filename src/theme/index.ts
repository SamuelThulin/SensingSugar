import { colors, createTheme } from '@mui/material';

const theme = (darkMode?: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.deepOrange[500],
      },
      secondary: {
        // main: colors.deepPurple[400],
        main: colors.amber[400],
      },
    },
    typography: {
      fontFamily: 'Syne Mono, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Syne Mono';
          font-style: normal;
          font-display: swap;s
          font-weight: 400;
          src: "local('Syne Mono'), local('Syne Mono')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
      },
    },
  });

export default theme;
