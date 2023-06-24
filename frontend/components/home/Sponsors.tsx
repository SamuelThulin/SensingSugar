import { Box, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

export const Sponsors = () => {
  const { t, i18n } = useTranslation();

  return (
    <Stack alignItems="center" spacing={2}>
      <Divider sx={{ width: '40%', mb: 2 }} />
      <Typography align="center" fontStyle="italic" variant="overline">
        {t('common:sponsor_text')}
      </Typography>
      <Box sx={{ mixBlendMode: 'luminosity' }}>
        <Link href="https://canadacouncil.ca/" target="_blank">
          <Image
            alt={t('common:Canada_Council_for_the_Arts')}
            src={
              i18n.language === 'fr'
                ? '/images/sponsor/CCA_RGB_colour_f.png'
                : '/images/sponsor/CCA_RGB_colour_e.png'
            }
            width={300}
            height={55}
          />
        </Link>
      </Box>
    </Stack>
  );
};
