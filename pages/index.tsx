import { getMarkdownContent } from '@/backend';
import {
  Appbar,
  CodeRepo,
  Credits,
  LanguageMenu,
  MarkdownTemplate,
  PageHead,
  Sponsors,
  StaticBackground,
  Title,
} from '@/frontend/components';
import { Box, Button, Container, Divider, Stack } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

type Props = {
  introContent: string;
};

export default function Home({ introContent }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <PageHead />

      <Appbar center={<LanguageMenu />} />
      <StaticBackground>
        <Container sx={{ pt: 4 }}>
          <Stack height="75vh">
            <Stack alignItems="center" py={1} spacing={7}>
              <Title />
              <Box maxWidth={800} px={2}>
                <MarkdownTemplate content={introContent} />
              </Box>
            </Stack>
            <Stack>
              <Stack alignItems="center" justifyContent="center" spacing={2} py={7}>
                <Button
                  color="primary"
                  LinkComponent={Link}
                  href="/yoursugar"
                  size="large"
                  sx={{ borderRadius: 4 }}
                  variant="outlined"
                >
                  {t('common:try_with_your_sugar')}
                </Button>
                <Button
                  color="secondary"
                  LinkComponent={Link}
                  href="/gallery"
                  sx={{ borderRadius: 4 }}
                  variant="outlined"
                >
                  {t('common:experience_someone_else_sugar')}
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack py={5} spacing={7}>
            <Credits />
            <Sponsors />
          </Stack>
          <Divider sx={{ py: 7 }} />
          <CodeRepo />
        </Container>
      </StaticBackground>
    </>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const introContent = await getMarkdownContent('intro', locale);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      introContent: introContent.content,
    },
  };
};
