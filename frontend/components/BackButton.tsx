import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import Link from 'next/link';

export const BackButton = () => (
	<IconButton LinkComponent={Link} href="/" size="small" sx={{ mr: 2 }}>
		<ArrowBackIcon fontSize="inherit" />
	</IconButton>
);
