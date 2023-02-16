import { parseCSVData, parseJsonData, useLocalstorage } from '@/frontend/actions';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
	termsAccepted: boolean;
};

export const DataDnD = ({ termsAccepted }: Props) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const { breakpoints, palette } = useTheme();

	const { setUserData } = useLocalstorage();

	const isMobile = useMediaQuery(breakpoints.down('sm'));
	const isTablet = useMediaQuery(breakpoints.down('md'));

	const dropZoneAnim = useAnimation();

	const [error, setError] = useState(false);

	const onDragEnter = () => {
		dropZoneAnim.start({
			color: isDragReject ? palette.error.light : palette.success.light,
			borderColor: isDragReject ? palette.error.light : palette.success.light,
			borderStyle: 'inset',
			borderWidth: isDragReject ? 1 : 4,
		});
	};

	const onDragLeave = () => {
		dropZoneAnim.start({
			borderColor: palette.secondary.dark,
			borderStyle: 'dashed',
			borderWidth: '1px',
		});
	};

	const onDrop = async (acceptedFiles: Array<File>) => {
		const accepted = acceptedFiles.length > 0;

		await dropZoneAnim.start({
			borderColor: palette.grey[400],
			borderStyle: 'dashed',
			borderWidth: '1px',
		});

		setError(false);
		if (!accepted) return;

		const dataType = acceptedFiles[0].type;
		const data = await acceptedFiles[0].text();

		const response = dataType === 'application/json' ? await parseJsonData(data) : await parseCSVData(data);

		if (!!response !== true) {
			setError(true);
			return;
		}

		setUserData(response);
		router.push('/play');
	};

	const { getRootProps, getInputProps, isDragReject } = useDropzone({
		accept: {
			'text/csv': ['.csv'],
			'applicaiton/json': ['.json'],
		},
		disabled: !termsAccepted,
		onDrop,
		onDragEnter,
		onDragLeave,
		maxFiles: 1,
		maxSize: 5_000_000,
	});

	return (
		<Stack direction={isMobile ? 'column' : isTablet ? 'row' : 'column'} spacing={2}>
			<Box {...getRootProps()}>
				<input {...getInputProps()} />
				<Box
					animate={dropZoneAnim}
					component={motion.div}
					sx={{
						display: 'flex',
						overflow: 'hidden',
						alignItems: 'center',
						justifyContent: 'center',
						height: 180,
						width: 180,
						p: 1,
						borderWidth: 1,
						borderColor: termsAccepted ? palette.common.white : palette.grey[500],
						borderStyle: 'dashed',
						borderRadius: 2,
						borderTopLeftRadius: '50%',
						borderBottomRightRadius: '10%',
						backdropFilter: termsAccepted ? 'blur(4px) contrast(1.5)' : 'blur(4px) contrast(0.5)',
						transform: 'rotate(45deg)',
						':hover': {
							borderStyle: termsAccepted ? 'solid' : 'dashed',
							cursor: termsAccepted ? 'pointer' : 'default',
						},
					}}
				>
					<Box sx={{ display: 'flex', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
						<Typography
							align="center"
							color={termsAccepted ? 'secondary.main' : palette.grey[900]}
							sx={{ lineHeight: '1.5rem' }}
							variant="overline"
						>
							{!termsAccepted && `${t('accept_terms')} ${t('before')}`}
							{!termsAccepted && <br />}
							{t('drag_drop_your_data_here')}
						</Typography>
					</Box>
				</Box>
			</Box>

			{error && (
				<Box>
					<Typography align="center" color="error" variant="body2">
						{t('error_data_malformed')}
					</Typography>
				</Box>
			)}
		</Stack>
	);
};
