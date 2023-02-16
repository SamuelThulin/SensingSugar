import { Appbar, BackButton, Footer, StaticBackground, Title } from '@/frontend/components';
import { DataDnD, Instructions, PrivacyTerms } from '@/frontend/yoursugar';
import { Button, Checkbox, Container, Divider, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function YourSugar(_props: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('common');

	const [termsAccepted, setTermsAccepted] = useState(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTermsAccepted(event.target.checked);
	};

	const acceptTermsLabel = t('accept_privacy_terms');

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
					<Typography align="center" color="secondary" component="h2" fontWeight={700} variant="h2">
						Sensing Your Sugar
					</Typography>
					<Stack width="100%" alignItems="center" spacing={2}>
						<Stack height={330} alignItems="center" mt={8} spacing={6}>
							<DataDnD termsAccepted={termsAccepted} />
							<Stack mb={2}>
								<FormControlLabel
									control={<Checkbox checked={termsAccepted} onChange={handleChange} size="small" />}
									label={`${acceptTermsLabel}`}
								/>
							</Stack>
						</Stack>
						<Button LinkComponent={Link} color="secondary" href="/gallery" sx={{ borderRadius: 4 }}>
							{t('experience_someone_else_sugar')}
						</Button>
						<Divider sx={{ width: '100%' }} />
						<Grid container spacing={3} pb={16}>
							<Grid item xs={12} sm={12} md={6} pr={12}>
								<Instructions />
							</Grid>
							<Grid item xs={12} sm={12} md={6} pr={12}>
								<PrivacyTerms />
							</Grid>
						</Grid>
					</Stack>
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
