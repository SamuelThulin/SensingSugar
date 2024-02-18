/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGalleryCollection } from '@/backend';
import { Appbar, BackButton, PageHead, Title } from '@/frontend/components';
import { PlayFrontend } from '@/frontend/play';
import type { SensingSugar } from '@/frontend/play/sensing/Sound';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Link as MuiLink } from '@mui/material';

export default function PlaySample(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const [sensingSugar, setSensingSugar] = useState<SensingSugar | null>(null);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // Add your logic here, like toggling the modal state
      }
      resetSounds();
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, sensingSugar]); // Add any state variables to dependencies array if needed.

  const handleSetSensingSugar = (value: SensingSugar) => setSensingSugar(value);

  //Stop all sounds
  const resetSounds = () => sensingSugar?.reset();

  const handleOnTitleClick = () => {
    sensingSugar?.reset();
    router.push('/');
  };

  return (
    <>
      <PageHead />

      <Appbar
        left={<BackButton onClick={resetSounds} />}
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
      <PlayFrontend setSensingSugar={handleSetSensingSugar} />
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
  const collection = await getGalleryCollection();

  const paths = collection.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true, // TRUE: allow to build dynamic static pages on the fly
  };
}
