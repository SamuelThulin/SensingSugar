import { Appbar, BackButton, Footer, StaticBackground, Title } from '@/frontend/components';
import { Sensing } from '@/frontend/playground';
import { Box, Container, Stack, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Playground(_props: InferGetStaticPropsType<typeof getStaticProps>) {
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
				<Container sx={{ pt: 4 }}>
					<Stack alignItems="center" spacing={7} pt={1} pb={1}>
						<Typography align="center" color="secondary" component="h2" fontWeight={700} variant="h2">
							Sugar Playground
						</Typography>
					</Stack>
					<Box mt={10}>
						<Sensing />
					</Box>
				</Container>
			</StaticBackground>
			<Footer />
		</>
	);
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? 'en', ['common'])),
	},
});
