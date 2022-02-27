import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyTerms: FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography color="secondary" component="h3" variant={isMobile ? 'subtitle1' : 'h6'}>
        {t(' Privacy terms')}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: '0.775rem',
          '::selection': {
            backgroundColor: ({ palette }) => palette.secondary.dark,
          },
        }}
      >
        {t(' Privacy terms_text')}
      </Typography>
    </Box>
  );
};

export default PrivacyTerms;
