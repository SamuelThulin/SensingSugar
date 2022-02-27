import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useActions } from '@src/overmind';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Instuctions from './Instructions';
import PrivacyTerms from './PrivacyTerms';

const DataForm: FC = () => {
  const { t } = useTranslation('common');
  const { parseData } = useActions();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dropZoneAnim = useAnimation();

  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const handleBackButton = () => navigate('/');

  const onDragEnter = () => {
    dropZoneAnim.start({
      borderColor: isDragReject ? theme.palette.error.light : theme.palette.success.light,
      borderStyle: 'inset',
      borderWidth: isDragReject ? 1 : 4,
      color: isDragReject ? theme.palette.error.light : theme.palette.success.light,
    });
  };

  const onDragLeave = () => {
    dropZoneAnim.start({
      borderColor: theme.palette.secondary.dark,
      borderStyle: 'dashed',
      borderWidth: '1px',
    });
  };

  const onDrop = async (acceptedFiles: Array<File>) => {
    const accepted = acceptedFiles.length > 0;

    await dropZoneAnim.start({
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      borderWidth: '1px',
    });

    setError(false);
    if (!accepted) return;

    const response = await parseData(acceptedFiles[0]);
    if (response !== true) {
      setError(true);
      return;
    }

    navigate('/play');
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: 'text/csv',
    onDrop,
    onDragEnter,
    onDragLeave,
    maxFiles: 1,
  });

  const acceptTermsLabel = t('accept_privacy_terms');

  return (
    <>
      <Typography
        align="center"
        color="primary"
        component="h1"
        sx={{ filter: ' blur(0.1rem)' }}
        variant={isMobile ? 'h3' : 'h2'}
      >
        Sensing Sugar
      </Typography>
      <Box maxWidth={1024} px={2}>
        <Grid container spacing={isTablet ? 5 : 20}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography color="primary" component="h2" variant={isMobile ? 'h6' : 'h5'}>
              {t('upload_your_sugar_data')}
            </Typography>
            <Stack direction={isMobile ? 'column' : isTablet ? 'row' : 'column'} spacing={2}>
              <Box>
                <Instuctions />
                <FormControlLabel
                  control={
                    <Checkbox checked={termsAccepted} onChange={handleChange} size="small" />
                  }
                  label={`${acceptTermsLabel}`}
                />
              </Box>
              {termsAccepted && (
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Paper
                    animate={dropZoneAnim}
                    component={motion.div}
                    elevation={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 1,
                      borderWidth: 1,
                      borderColor: ({ palette }) => palette.secondary.dark,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                      ':hover': { borderStyle: 'solid', cursor: 'pointer' },
                    }}
                  >
                    <Box width="25ch" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography
                        align="center"
                        color="primary.light"
                        variant="overline"
                        sx={{ lineHeight: '1.5rem' }}
                      >
                        {t('drag_drop_your_data_here')}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
              {error && (
                <Box>
                  <Typography color="error" align="center" variant="body2">
                    {t('error_data_malformed')}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PrivacyTerms />
          </Grid>
        </Grid>
      </Box>
      {!isTablet && <Box flexGrow={1} />}
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default DataForm;
