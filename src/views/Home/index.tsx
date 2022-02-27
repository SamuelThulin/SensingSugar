import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [muted, setMuted] = useState(true);

  const handleMuteButton = () => setMuted(!muted);
  const handleGalleryButton = () => navigate('/gallery');
  const handleTryYourSugarButton = () => navigate('/form');

  return (
    <>
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
          {t('short_intro')}
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
          {t('feel_your_sugar')}
        </Button>
        <Button color="secondary" onClick={handleGalleryButton} sx={{ borderRadius: 4 }}>
          {t('experience_someone_else_sugar')}
        </Button>
      </Stack>
    </>
  );
};

export default Home;
