import { getGallery } from '@/backend';
import { Appbar, BackButton, Footer, Title } from '@/frontend/components';
import { PlayFrontend } from '@/frontend/play';
import { Button } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';

export default function PlaySample(_props: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('common');

	const [showData, setShowData] = useState(false);

	const toogleShowData = (value: boolean) => setShowData(value);

	return (
		<>
			<Head>
				<title>Sensing Sugar</title>
				<meta name="description" content="Sensing Sugar" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Appbar
				left={<BackButton />}
				center={<Title color="inherit" size="subtitle1" />}
				right={
					<Button color="inherit" onClick={() => toogleShowData(true)} size="small" sx={{ borderRadius: 4 }}>
						{t('show_data_source')}
					</Button>
				}
			/>
			<PlayFrontend showData={showData} toggleShowData={toogleShowData} />
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

export async function getStaticPaths() {
	const samples = await getGallery();

	const paths = samples.map(({ name }) => ({
		params: { id: name },
	}));

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	};
}
