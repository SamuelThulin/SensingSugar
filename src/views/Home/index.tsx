import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Home: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [muted, setMuted] = useState(true);

  const handleMuteButton = () => setMuted(!muted);
  const handleGalleryButton = () => navigate('/gallery');
  const handleTryYourSugarButton = () => navigate('/form');

  return (
    <Stack alignItems="center" height="100vh" spacing={7} pt={5} pb={1}>
      <Typography
        align="center"
        color="primary"
        component="h1"
        sx={{ filter: ' blur(0.1rem)' }}
        variant={isMobile ? 'h3' : 'h2'}
      >
        Sensing Sugar
      </Typography>
      <Box maxWidth={800} px={2}>
        <Typography
          variant="body2"
          sx={{
            '::selection': {
              background: ({ palette }) => palette.secondary.dark,
            },
          }}
        >
          It is a long established fact that a reader will be distracted by the readable content of
          a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using Content here, content
          here, making it look like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will
          uncover many web sites still in their infancy. Various versions have evolved over the
          years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height={300}
        sx={{ background: 'url(./assets/images/home-placeholder.png)' }}
      >
        <IconButton
          onClick={handleMuteButton}
          sx={{
            position: 'absolute',
            width: 60,
            border: '1px solid white',
            borderRadius: 4,
          }}
          size="small"
        >
          {muted ? <VolumeOffIcon fontSize="inherit" /> : <VolumeUpIcon fontSize="inherit" />}
        </IconButton>
      </Box>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Button
          color="primary"
          onClick={handleTryYourSugarButton}
          size="large"
          sx={{ borderRadius: 4 }}
          variant="outlined"
        >
          Try with your sugar
        </Button>
        <Button color="secondary" onClick={handleGalleryButton} sx={{ borderRadius: 4 }}>
          Experience someone else’s sugar
        </Button>
      </Stack>
      {!isMobile && <Box flexGrow={1} />}
      <Footer />
    </Stack>
  );
};

export default Home;
