import { Box, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import * as Tone from 'tone';
import { Sensing } from './sensing';
import type { SensingSugar } from './sensing/Sound';
import { useSugar } from './useSugar';

type Props = {
  setSensingSugar: (value: SensingSugar) => void;
};

export const PlayFrontend = ({ setSensingSugar }: Props) => {
  const { data, loading } = useSugar();
  const { t } = useTranslation();

  const [audioReady, setAudioReady] = useState(Tone.immediate() > 0);

  const handleClick = () => setAudioReady(true);

  return (
    <Box>
      {(loading || !audioReady) && (
        <Box
          display="flex"
          width="100vw"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          {!audioReady && (
            <Button onClick={handleClick} size="large" sx={{ position: 'absolute', zIndex: 1 }}>
              {t('common:click_to_start')}
            </Button>
          )}
          <CircularProgress size={200} sx={{ filter: 'blur(20px)' }} />
        </Box>
      )}

      {data && !loading && audioReady && (
        <Box>
          <Sensing {...{ data, setSensingSugar }} />
        </Box>
      )}
    </Box>
  );
};
