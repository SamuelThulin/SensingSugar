import { Appbar, Footer, LanguageMenu , StaticBackground, Title } from '@/frontend/components';
import AttractionsIcon from '@mui/icons-material/Attractions';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Button, Container, Icon, IconButton, Stack, Typography, useTheme } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
	// Add custom props here
};

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('common');
	const { palette } = useTheme();

	const [muted, setMuted] = useState(true);

	const handleMuteButton = () => setMuted(!muted);

	return (
		<>
			<Head>
				<title>Sensing Sugar</title>
				<meta name="description" content="Sensing Sugar" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Appbar
				left={
					<IconButton color="secondary" LinkComponent={Link} href="/playground" size="small">
						<AttractionsIcon fontSize="inherit" />
					</IconButton>
				}
				center={
					<LanguageMenu />
				}
			/>
			<StaticBackground>
				<Container sx={{ pt: 4 }}>
					<Stack alignItems="center" spacing={7} py={1}>
						<Title />
						<Box maxWidth={800} px={2}>
							<Typography sx={{ '::selection': { bgcolor: palette.secondary.dark } }} variant="body1">
								{t('short_intro')}
							</Typography>
						</Box>
					</Stack>
					<Stack>
						<Stack alignItems="center" justifyContent="center" spacing={2}>
							<Box height={80} my={6}>
								<IconButton
									onClick={handleMuteButton}
									sx={{ width: 60, border: '1px solid white', borderRadius: 4 }}
									size="small"
								>
									<Icon component={muted ? VolumeOffIcon : VolumeUpIcon} fontSize="inherit" />
								</IconButton>
							</Box>
							<Button
								color="primary"
								LinkComponent={Link}
								href="/yoursugar"
								size="large"
								sx={{ borderRadius: 4 }}
								variant="outlined"
							>
								{t('feel_your_sugar')}
							</Button>
							<Button color="secondary" LinkComponent={Link} href="/gallery" sx={{ borderRadius: 4 }}>
								{t('experience_someone_else_sugar')}
							</Button>
						</Stack>
					</Stack>
				</Container>
			</StaticBackground>
			<Footer />
		</>
	);
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? 'en', ['common'])),
	},
});
