import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import Link from 'next/link';

type BackButtonProps = {
  onClick?: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => (
  <IconButton LinkComponent={Link} href="/" onClick={onClick} size="small" sx={{ mr: 2 }}>
    <ArrowBackIcon fontSize="inherit" />
  </IconButton>
);
