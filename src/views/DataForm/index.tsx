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
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivacyTerms from './PrivacyTerms';
import Instuctions from './Instructions';
import { useDropzone } from 'react-dropzone';
import { motion, useAnimation } from 'framer-motion';
import Footer from '../../components/Footer';

const DataForm: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    if (accepted) parseData(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: 'text/csv',
    onDrop,
    onDragEnter,
    onDragLeave,
    maxFiles: 1,
  });

  const parseData = (file: File) => {
    console.log('parse data', file);
    // setError(true);
    navigate('/play')
  };

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
      <Box maxWidth={1024} px={2}>
        <Grid container spacing={20}>
          <Grid item xs={6}>
            <Typography color="primary" component="h2" variant={isMobile ? 'h6' : 'h5'}>
              Upload your sugar data
            </Typography>
            <Stack spacing={2}>
              <Instuctions />
              <FormControlLabel
                control={<Checkbox checked={termsAccepted} onChange={handleChange} size="small" />}
                label="Accept (privacy terms)"
              />
              {termsAccepted && (
                <Box {...getRootProps()} >
                  <input {...getInputProps()} />
                  <Paper
                    animate={dropZoneAnim}
                    component={motion.div}
                    elevation={1}
                    sx={{
                      display: 'flex', justifyContent: 'center',
                      p: 1,
                      borderWidth: 1,
                      borderColor: ({ palette }) => palette.secondary.dark,
                      borderStyle: 'dashed',
                      borderRadius: 2,
                      ':hover': { borderStyle: 'solid', cursor: 'pointer' },
                    }}
                  >
                    <Box width="25ch" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography align="center" color="primary.light" variant="overline">
                        Drag &apos;n&apos; drop your data here, or click to select a file
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
              {error && (
                <Box>
                  <Typography color="error" align="center" variant="body2">
                    Error: Data mal-formed. Check instructions above.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <PrivacyTerms />
          </Grid>
        </Grid>
      </Box>
      <Box flexGrow={1} />
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      {!isMobile && <Box flexGrow={1} />}
      <Footer />
    </Stack>
  );
};

export default DataForm;
