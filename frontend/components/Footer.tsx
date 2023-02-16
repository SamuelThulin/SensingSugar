import { Button, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
	const { t } = useTranslation('common');
	return (
		<Stack position="fixed" bottom={0} alignItems="center" width="100%" sx={{ marginTop: 'auto' }}>
			<Button
				href="https://samuelthulin.com"
				target="_blank"
				color="inherit"
				size="small"
				sx={{ mb: 0.25, borderRadius: 4, backdropFilter: 'brightness(0.5)' }}
			>
				{t('about')}
			</Button>
		</Stack>
	);
};
