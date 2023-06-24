import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';

type BackButtonProps = {
  onClick?: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
    onClick && onClick();
  };

  return (
    <IconButton onClick={handleClick} size="small" sx={{ mr: 2 }}>
      <ArrowBackIcon fontSize="inherit" />
    </IconButton>
  );
};
