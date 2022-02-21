import { Box, Button } from '@mui/material';
import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <Box sx={{ marginTop: 'auto' }}>
      <Button
        href="https://samuelthulin.com"
        target="_blank"
        color="inherit"
        size="small"
        sx={{ borderRadius: 4 }}
      >
        About
      </Button>
    </Box>
  );
};

export default Footer;
