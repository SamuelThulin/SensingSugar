import AttractionsIcon from '@mui/icons-material/Attractions';
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import LanguageMenu from '../../components/LanguageMenu';

const DefaultLayout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleClickPlayground = () => navigate('/playground');

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
          <Stack direction="row" alignItems="center" spacing={1} width="100%" px={2}>
            <IconButton color="info" onClick={handleClickPlayground} size="small">
              <AttractionsIcon fontSize="inherit" />
            </IconButton>
            <Box flexGrow={1} />
            <LanguageMenu />
            <Box flexGrow={1} />
          </Stack>
          <Outlet />
          {!isMobile && <Box flexGrow={1} />}
          <Footer />
        </Stack>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
