import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const StaticBackground = ({ children }: PropsWithChildren) => (
	<Box
		display="flex"
		height="100vh"
		width="100vw"
		overflow="auto"
		sx={{
			backgroundSize: 'cover',
			backgroundImage:
				'linear-gradient(to bottom, rgb(49 78 255 / 52%), rgb(81 0 0 / 73%)), url(/home-placeholder.png)',
			filter: 'hue-rotate(0deg)',
		}}
	>
		{children}
	</Box>
);
