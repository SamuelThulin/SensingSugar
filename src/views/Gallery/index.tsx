import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { FileDetail } from '../../@types';
import { useActions } from '../../overmind';
import Sample from './Sample';

const Gallery: FC = () => {
  const { getDataGallery } = useActions();
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [gallery, setGallery] = useState<FileDetail[]>([]);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const response = await getDataGallery();
    setGallery(response);
  };

  const handleBackButton = () => navigate('/');

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
              background: ({ palette }) => palette.secondary.dark, //'yellow',
            },
          }}
        >
          {t('short_intro')}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" px={2}>
        {gallery.map((data, index) => (
          <Sample key={index} file={data} />
        ))}
      </Stack>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Button color="primary" size="large" sx={{ borderRadius: 4 }} variant="outlined">
          {t('feel_your_sugar')}
        </Button>
        <Box flexGrow={1} />
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default Gallery;
