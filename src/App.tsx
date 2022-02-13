import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC } from 'react';
// import { useRoutes } from 'react-router-dom';
// import { useAppState } from './overmind';
// import routes from './routes';
import theme from './theme';
// import { useTracking } from './tracking';
import Home from './Home';

const App: FC = () => {
  // const routing = useRoutes(routes);
  // const { ui } = useAppState();
  // useTracking(process.env.GA_MEASUREMENT_ID);

  return (
    <ThemeProvider theme={theme(true)}>
      <CssBaseline />
      {/* {routing} */}
      <Home />
    </ThemeProvider>
  );
};

export default App;
