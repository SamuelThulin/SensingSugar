import { parseData, useLocalstorage } from '@/src/dataParser';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';

type Props = {
  setErrorMessage: (message: string) => void;
  termsAccepted: boolean;
};

export const DataDnD = ({ setErrorMessage, termsAccepted }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { breakpoints, palette } = useTheme();

  const { setUserData } = useLocalstorage();

  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const isTablet = useMediaQuery(breakpoints.down('md'));

  const onDrop = async (acceptedFiles: Array<File>) => {
    const accepted = acceptedFiles.length > 0;
    if (!accepted) return;

    const data = await acceptedFiles[0].text();
    const response = await parseData(data);

    //* error
    if (typeof response === 'string') {
      let message = `${t('common:data_malformed')}:`;
      if (response === 'no glucose') message = `${message} ${t('common:glucose_not_found')}.`;
      message = `${message} ${t('common:check_instructions_bellow')}.`;
      setErrorMessage(message);
      return;
    }

    setUserData(response);
    router.push('/play');
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: { 'text/csv': ['.csv'], 'applicaiton/json': ['.json'] },
    disabled: !termsAccepted,
    maxFiles: 1,
    maxSize: 5_000_000,
    onDrop,
  });

  const variant: Variants = {
    initial: {
      y: 10,
      rotate: 46,
      transition: {
        y: { duration: 6, repeat: Infinity, repeatType: 'mirror' },
        rotate: { duration: 9, repeat: Infinity, repeatType: 'mirror', type: 'spring' },
      },
    },
  };

  return (
    <Stack
      direction={isMobile ? 'column' : isTablet ? 'row' : 'column'}
      alignItems="center"
      spacing={2}
    >
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            height: 180,
            width: 180,
            p: 1,
            borderWidth: 1,
            borderColor: termsAccepted ? palette.common.white : palette.grey[500],
            borderStyle: 'dashed',
            borderRadius: 2,
            borderTopLeftRadius: '50%',
            borderBottomRightRadius: '10%',
            backdropFilter: termsAccepted ? 'blur(4px) contrast(1.5)' : 'blur(4px) contrast(0.5)',
          }}
          variants={variant}
          initial={{ rotate: 44 }}
          animate="initial"
          whileHover={{
            borderBottomRightRadius: '5%',
            borderStyle: termsAccepted ? 'solid' : 'dashed',
            cursor: termsAccepted ? 'pointer' : 'default',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
            <Typography
              align="center"
              color={termsAccepted ? 'secondary.main' : palette.grey[900]}
              sx={{ lineHeight: '1.5rem' }}
              variant="overline"
            >
              {!termsAccepted && `${t('common:accept_terms')} ${t('common:before')}`}
              {!termsAccepted && <br />}
              {t('common:drag_drop_your_data_here')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
