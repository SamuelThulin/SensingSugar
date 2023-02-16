import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const Instructions = () => {
	const { t } = useTranslation('common');
	const { breakpoints, palette } = useTheme();
	
	const isMobile = useMediaQuery(breakpoints.down('sm'));

	return (
		<Box>
			<Typography color="secondary" component="h3" variant={isMobile ? 'subtitle1' : 'h6'}>
				{t('how_to_structure_your_file')}
			</Typography>
			<Typography
				sx={{
					fontSize: '0.775rem',
					'::selection': { bgcolor: palette.secondary.dark },
				}}
				variant="body2"
			>
				It is a long established fact that a reader will be distracted by the readable content of a page when
				looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
				of letters, as opposed to using Content here, content here, making it look like readable English
			</Typography>
		</Box>
	);
};
