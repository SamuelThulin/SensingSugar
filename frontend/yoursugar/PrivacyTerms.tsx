import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const PrivacyTerms = () => {
	const { t } = useTranslation('common');
	const { breakpoints, palette } = useTheme();

	const isMobile = useMediaQuery(breakpoints.down('sm'));

	return (
		<Box>
			<Typography color="secondary" component="h3" variant={isMobile ? 'subtitle1' : 'h6'}>
				{t('Privacy terms')}
			</Typography>
			<Typography
				sx={{
					fontSize: '0.775rem',
					'::selection': { bgcolor: palette.secondary.dark },
				}}
				variant="body2"
			>
				{t('Privacy terms_text')}
			</Typography>
		</Box>
	);
};
