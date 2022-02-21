import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

const PrivacyTerms: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography color="secondary" component="h3" variant={isMobile ? 'subtitle1' : 'h6'}>
        Disclaimer / Privacy terms
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
        making it look like readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover
        many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like). It is a long
        established fact that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using Content here, content here, making it look like
        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
        as their default model text, and a search for lorem ipsum will uncover many web sites still
        in their infancy. Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </Typography>
    </Box>
  );
};

export default PrivacyTerms;
