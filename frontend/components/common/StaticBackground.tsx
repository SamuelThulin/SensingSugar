import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const StaticBackground = ({ children }: PropsWithChildren) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    sx={{
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundImage:
        'linear-gradient(to bottom, rgb(49 78 255 / 52%), rgb(81 0 0 / 73%)), url(/images/main_background.png)',
      filter: 'hue-rotate(317deg)',
    }}
  >
    {children}
  </Box>
);
