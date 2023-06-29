import { Box, Button, Divider, Grid, Link as LinkMui, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

type Person = {
  name: string;
  role: string;
  url: string;
};

export const Credits = () => {
  const { t } = useTranslation();

  const creditData: Person[] = [
    { name: 'Samuel Thulin', role: t('common:artist'), url: 'https://samuelthulin.com' },
    {
      name: 'Luciano Frizzera',
      role: t('common:web_developer'),
      url: 'https://luciano.fluxo.art.br',
    },
  ];

  return (
    <Stack alignItems="center" spacing={2}>
      <Divider sx={{ width: '60%' }}>
        <Typography align="center" variant="h5">
          {t('common:credits')}
        </Typography>
      </Divider>

      {creditData.map(({ name, role, url }) => (
        <Grid key={name} container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={6} alignContent="flex-end">
            <Typography align="right" fontWeight={700} pr={2}>
              {role}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <LinkMui href={url} target="_blank" underline="hover">
              {name}
            </LinkMui>
          </Grid>
        </Grid>
      ))}

      <Box py={4}>
        <Button
          color="secondary"
          href="https://samuelthulin.com"
          LinkComponent={Link}
          sx={{ px: 2, borderRadius: 4 }}
          target="_blank"
        >
          {t('common:learnMoreAboutThisProject')}
        </Button>
      </Box>
    </Stack>
  );
};
