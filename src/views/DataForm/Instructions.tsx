import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Instructions: FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography color="secondary" component="h3" variant={isMobile ? 'subtitle1' : 'subtitle1'}>
        {t('how_to_structure_your_file')}
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
        It is a long established fact that a reader will be distracted by the readable content of a
        page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using Content here, content here,
        making it look like readable English
      </Typography>
    </Box>
  );
};

export default Instructions;
