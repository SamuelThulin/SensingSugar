import { AppBar, Box, Toolbar } from '@mui/material';

type Props = {
  center?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const Appbar = ({ center, left, right }: Props) => (
  <AppBar color="transparent" elevation={0} sx={{ backdropFilter: 'blur(7px)' }}>
    <Toolbar sx={{ justifyContent: 'space-between' }} variant="dense">
      <Box minWidth={100}>{left}</Box>
      <Box minWidth={100}>{center}</Box>
      <Box minWidth={100}>{right}</Box>
    </Toolbar>
  </AppBar>
);
