import { supportedLanguages } from '@/src/utilities/util';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

export const LanguageMenu = () => {
	const router = useRouter();
	const { i18n } = useTranslation();

	const optionVariants = {
		initial: { y: -100 },
		visible: { y: 0 },
		exit: { y: -100 },
	};

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClick = (newLocale: string) => {
		const { pathname, asPath, query } = router;
		router.push({ pathname, query }, asPath, { locale: newLocale });
		handleClose();
	};

	const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => setAnchorEl(null);

	return (
		<Box
			key="language"
			component={motion.div}
			variants={optionVariants}
			initial="initial"
			animate="visible"
			transition={{ delay: 0.2 }}
			exit="exit"
		>
			<Button
				color="inherit"
				onClick={handleOpenMenu}
				size="small"
				startIcon={<LanguageIcon fontSize="inherit" />}
				sx={{ borderRadius: 4 }}
			>
				{i18n.language}
			</Button>
			<Menu
				anchorEl={anchorEl}
				id="language-menu"
				onClose={handleClose}
				open={open}
				PaperProps={{
					sx: {
						borderRadius: 3,
						backdropFilter: 'blur(7px)',
						backgroundColor: 'transparent ',
						boxShadow: 'none',
					},
				}}
			>
				{Array.from(supportedLanguages).map(([, { code, name, shortName }]) => (
					<MenuItem key={code} onClick={() => handleClick(shortName)} value={shortName}>
						{name}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};
