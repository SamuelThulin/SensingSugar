import { PageHead, StaticBackground, Title } from '@/frontend/components';
import { Button, Container, Stack, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
interface Props {
  // add custom document props
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Custom404(Props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <PageHead />

      <StaticBackground>
        <Container>
          <Stack height="75vh">
            <Stack alignItems="center" spacing={7}>
              <Title size="h2" />
            </Stack>
            <Stack>
              <Stack alignItems="center" justifyContent="center" spacing={2} py={7}>
                <Typography>{t('common:404_page_not_found')}.</Typography>
                <Button
                  color="secondary"
                  LinkComponent={Link}
                  href="/"
                  sx={{ px: 2, borderRadius: 4 }}
                >
                  {t('common:go_to_the_home_page')}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </StaticBackground>
    </>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
