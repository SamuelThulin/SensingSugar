import { colors, createTheme } from '@mui/material';

const theme = (darkMode?: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.deepPurple[400],
      },
      secondary: {
        main: colors.deepOrange[500],
      },
    },
  });

export default theme;
