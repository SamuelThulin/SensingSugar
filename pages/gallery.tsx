import type { DataCollectionItem } from '@/@types';
import { getGalleryCollection, getMarkdownContent } from '@/backend';
import {
  Appbar,
  BackButton,
  MarkdownTemplate,
  PageHead,
  StaticBackground,
  Title,
} from '@/frontend/components';
import { Sample } from '@/frontend/gallery';
import {
  Box,
  Button,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  collection: DataCollectionItem[];
  contribute: string;
}

export default function Gallery({
  collection,
  contribute,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { breakpoints, palette } = useTheme();
  const router = useRouter();

  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const handleOnTitleClick = () => router.push('/');

  return (
    <>
      <PageHead />

      <Appbar
        left={<BackButton />}
        center={
          <MuiLink
            color="inherit"
            onClick={handleOnTitleClick}
            underline="none"
            sx={{ cursor: 'pointer' }}
          >
            <Title color="inherit" size="subtitle1" />
          </MuiLink>
        }
      />
      <StaticBackground>
        <Container sx={{ pt: 8, maxWidth: 800 }}>
          <Stack alignItems="center" spacing={7} pt={1} pb={1}>
            <Typography
              align="center"
              color="secondary"
              component="h2"
              fontWeight={700}
              variant={isMobile ? 'h4' : 'h2'}
            >
              {t('common:sugar_gallery')}
            </Typography>
            <Box px={2}>
              <Typography paragraph sx={{ '::selection': { bgcolor: palette.secondary.dark } }}>
                {t('common:gallery_text_1')}
              </Typography>
              <Typography paragraph sx={{ '::selection': { bgcolor: palette.secondary.dark } }}>
                {t('common:gallery_text_2')}
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems="center" px={10}>
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              minHeight={140}
              maxWidth={700}
              my={6}
              px={2}
            >
              {collection.map((data) => (
                <Sample key={data.id} {...data} />
              ))}
            </Stack>
          </Stack>
          <Stack alignItems="center" justifyContent="center" spacing={4}>
            <Button
              LinkComponent={Link}
              href="/yoursugar"
              color="primary"
              size="large"
              sx={{ borderRadius: 4 }}
              variant="outlined"
            >
              {t('common:try_with_your_sugar')}
            </Button>
            <Divider sx={{ width: '100%' }} />
            <Box px={2} pb={6}>
              <MarkdownTemplate content={contribute} />
            </Box>
          </Stack>
        </Container>
      </StaticBackground>
    </>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const collection = await getGalleryCollection();
  const contribute = await getMarkdownContent('contribute', locale);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      collection,
      contribute: contribute.content,
    },
  };
};
