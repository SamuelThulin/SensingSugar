import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation('common');
  return (
    <Box sx={{ marginTop: 'auto' }}>
      <Button
        href="https://samuelthulin.com"
        target="_blank"
        color="inherit"
        size="small"
        sx={{ borderRadius: 4 }}
      >
        {t('about')}
      </Button>
    </Box>
  );
};

export default Footer;
