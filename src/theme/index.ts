import { colors, createTheme } from '@mui/material';
import { Syne_Mono } from 'next/font/google';

const syneMono = Syne_Mono({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  display: 'block',
});

const theme = (darkMode?: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.deepOrange[500],
      },
      secondary: {
        main: colors.amber[400],
      },
    },
    typography: {
      fontFamily: `${syneMono.style.fontFamily}, Helvetica, Arial, sans-serif`,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: '${syneMono.style.fontFamily}';
          font-style: ${syneMono.style.fontStyle};
          font-weight: ${syneMono.style.fontWeight};
          src: "local('Syne Mono'), local('Syne Mono'), url(${syneMono.style.fontFamily})";
        }
      `,
      },
    },
  });

export default theme;
