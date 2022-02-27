import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import LanguageMenu from '../../components/LanguageMenu';

const DefaultLayout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ flex: '1 1 auto' }}>
        <Stack alignItems="center" height="100vh" spacing={7} pt={1} pb={1}>
          <LanguageMenu />
          <Outlet />
          {!isMobile && <Box flexGrow={1} />}
          <Footer />
        </Stack>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
