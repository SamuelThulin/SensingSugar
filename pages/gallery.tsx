import { getGallery } from '@/backend';
import { Appbar, BackButton, Footer, StaticBackground, Title } from '@/frontend/components';
import { Sample } from '@/frontend/gallery';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';

type Sample = {
	filename: string;
	name: string;
};

type Props = {
	samples: Sample[];
};

export default function Gallery({ samples }: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('common');

	const { palette } = useTheme();

	return (
		<>
			<Head>
				<title>Sensing Sugar</title>
				<meta name="description" content="Sensing Sugar" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Appbar left={<BackButton />} center={<Title color="inherit" size="subtitle1" />} />
			<StaticBackground>
				<Container sx={{ pt: 8 }}>
					<Stack alignItems="center" spacing={7} pt={1} pb={1}>
						<Typography align="center" color="secondary" component="h2" fontWeight={700} variant="h2">
							Sugar Gallery
						</Typography>
						<Box maxWidth={800} px={2}>
							<Typography sx={{ '::selection': { bgcolor: palette.secondary.dark } }} variant="body1">
								{t('short_intro')}
							</Typography>
						</Box>
					</Stack>

					{/* <Hero showShortIntro /> */}
					<Stack
						direction="row"
						justifyContent="center"
						flexWrap="wrap"
						px={2}
						minHeight={100}
						mt={6}
						mb={12}
					>
						{samples.map((file, index) => (
							<Sample key={index} filename={file.name} />
						))}
					</Stack>
					<Stack alignItems="center" justifyContent="center" spacing={2}>
						<Button
							LinkComponent={Link}
							href="/yoursugar"
							color="primary"
							size="large"
							sx={{ borderRadius: 4 }}
							variant="outlined"
						>
							{t('feel_your_sugar')}
						</Button>
					</Stack>
				</Container>
			</StaticBackground>
			<Footer />
		</>
	);
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
	const samples = await getGallery();

	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
			samples,
		},
	};
};
