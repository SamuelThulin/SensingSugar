import { Box, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface SampleProps {
	filename: string;
}

export const Sample = ({ filename }: SampleProps) => {
	const { palette } = useTheme();
	const router = useRouter();

	// const handleClick = () => router.push({ pathname: '/play', query: { q: filename } });

	const handleClick = () => router.push({ pathname: `/play/${filename}`});

	return (
		<Stack
			alignItems="center"
			component={motion.div}
			onClick={handleClick}
			spacing={1}
			m={1}
			whileHover={{ cursor: 'pointer' }}
		>
			<Box
				display="flex"
				alignItems="center"
				width={40}
				height={80}
				p={1}
				sx={{
					borderWidth: 1,
					borderStyle: 'solid',
					borderRadius: 1,
					borderColor: palette.secondary.dark,
					bgcolor: palette.secondary.light,
					color: palette.primary.dark,
				}}
				component={motion.div}
				whileHover={{
					y: -15,
					width: 50,
					height: 50,
					color: 'rgb(255,255,255)',
					backgroundColor: palette.secondary.dark,
					borderTopRightRadius: '50%',
					borderBottomLeftRadius: '50%',
					borderBottomRightRadius: '50%',
					borderColor: palette.secondary.light,
					boxShadow: `0 0 8px 4px ${palette.primary.dark}`,
					scale: 1.5,
					// rotate: 1,
					rotateZ: 45,
					transition: { type: 'spring', duration: 1 },
				}}
			>
				<Typography align="center" variant="h6">
					#{filename}
				</Typography>
			</Box>
		</Stack>
	);
};
