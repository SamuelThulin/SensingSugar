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
import { Box, Button, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

type Props = {
  introContent: string;
};

export default function Home({ introContent }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down('sm'));

  return (
    <>
      <PageHead />

      <Appbar center={<LanguageMenu />} />
      <StaticBackground>
        <Container sx={{ pt: 4 }}>
          <Stack>
            <Stack alignItems="center" py={1} spacing={7}>
              <Title size={isMobile ? 'h3' : 'h1'} />
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
          <Stack py={5} spacing={2}>
            <Credits />
            <Sponsors />
          </Stack>
          <Divider sx={{ py: 1 }} />
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
