import { Appbar, BackButton, PageHead, Title } from '@/frontend/components';
import { Sensing } from '@/frontend/playground';
import { Box, Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Playground(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageHead />

      <Appbar left={<BackButton />} center={<Title color="inherit" size="subtitle1" />} />
      <Container sx={{ pt: 2 }}>
        <Box mt={0}>
          <Sensing />
        </Box>
      </Container>
    </>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
