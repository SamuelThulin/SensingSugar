import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Sample from './Sample';

const samples = ['1', '2', '3', '4', '5', '6', '7'];

const Gallery: FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackButton = () => navigate('/');

  return (
    <Stack alignItems="center" height="100vh" spacing={7} pt={5} pb={1}>
      <Typography
        align="center"
        color="primary"
        component="h1"
        sx={{ filter: ' blur(0.1rem)' }}
        variant={isMobile ? 'h3' : 'h2'}
      >
        Sensing Sugar
      </Typography>
      <Box maxWidth={800} px={2}>
        <Typography
          variant="body2"
          sx={{
            '::selection': {
              background: ({ palette }) => palette.secondary.dark, //'yellow',
            },
          }}
        >
          {t('short_intro')}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" px={2}>
        {samples.map((id) => (
          <Sample key={id} id={id} />
        ))}
      </Stack>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Button color="primary" size="large" sx={{ borderRadius: 4 }} variant="outlined">
          {t('feel_your_sugar')}
        </Button>
        <Box flexGrow={1} />
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      {!isMobile && <Box flexGrow={1} />}
      <Footer />
    </Stack>
  );
};

export default Gallery;
