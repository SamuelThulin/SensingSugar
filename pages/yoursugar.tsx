import { getMarkdownContent } from '@/backend';
import {
  Appbar,
  BackButton,
  MarkdownTemplate,
  PageHead,
  StaticBackground,
  Title,
} from '@/frontend/components';
import { DataDnD, ErrorDialog } from '@/frontend/yoursugar';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';

type Props = {
  howItWorksContent: string;
  howToStructure: string;
};

export default function YourSugar({
  howItWorksContent,
  howToStructure,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleErrorDialogClose = () => setError(null);
  const setErrorMessage = (message: string) => setError(message);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <>
      <PageHead />

      <Appbar left={<BackButton />} center={<Title color="inherit" size="subtitle1" />} />
      <StaticBackground>
        <Container sx={{ pt: 8 }}>
          <Typography align="center" color="secondary" component="h2" fontWeight={700} variant="h2">
            {t('common:sensing_your_sugar')}
          </Typography>
          <Stack width="100%" alignItems="center" spacing={5}>
            <Stack alignItems="center" mt={8} spacing={6}>
              <DataDnD setErrorMessage={setErrorMessage} termsAccepted={termsAccepted} />
              <Stack mb={2} width={600}>
                <Stack direction="row" justifyContent="center">
                  <FormControlLabel
                    control={
                      <Checkbox checked={termsAccepted} onChange={handleChange} size="small" />
                    }
                    label={t('common:accept_privacy_terms')}
                  />
                </Stack>
                <Typography
                  sx={{ fontSize: '0.775rem', '::selection': { bgcolor: palette.secondary.dark } }}
                  variant="body2"
                >
                  {t('common:privacy_terms_text')}
                </Typography>
              </Stack>
            </Stack>
            <Button
              LinkComponent={Link}
              color="secondary"
              href="/gallery"
              sx={{ borderRadius: 4 }}
              size="large"
              variant="outlined"
            >
              {t('common:experience_someone_else_sugar')}
            </Button>
            <Divider sx={{ width: '100%' }} />
            <Stack width={600} pb={6} spacing={2}>
              <MarkdownTemplate content={howToStructure} />
              <MarkdownTemplate content={howItWorksContent} />
            </Stack>
          </Stack>
          {!!error && <ErrorDialog message={error} closeDialog={handleErrorDialogClose} />}
        </Container>
      </StaticBackground>
    </>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const howToStructure = await getMarkdownContent('how_to_structure_file', locale);
  const howItWorksContent = await getMarkdownContent('how_it_works', locale);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      howToStructure: howToStructure.content,
      howItWorksContent: howItWorksContent.content,
    },
  };
};
