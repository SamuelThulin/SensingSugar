import type { DataCollectionItem } from '@/@types';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Sample = ({ id, name, background }: DataCollectionItem) => {
  const { palette } = useTheme();
  const router = useRouter();

  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleClick = () => router.push({ pathname: `/play/${id}` });

  const stripVariant: Variants = {
    initial: {
      width: 60,
      height: 120,
      backgroundColor: palette.secondary.light,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      borderColor: palette.secondary.dark,
    },
    hover: {
      y: -5,
      width: 60,
      height: 60,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: palette.primary.light,
      borderTopRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      borderColor: palette.secondary.light,
      boxShadow: `0 0 8px 4px ${palette.primary.dark}`,
      rotateZ: 45,
      transition: {
        type: 'spring',
        duration: 1,
        y: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
      },
    },
  };

  const labelVariant: Variants = {
    initial: { y: -45, opacity: 0 },
    hover: { y: -55, opacity: 1 },
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      maxWidth={150}
      height={170}
      spacing={1}
      m={1}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      component={motion.div}
      whileHover={{ cursor: 'pointer' }}
    >
      <Box
        display="flex"
        alignItems="center"
        component={motion.div}
        variants={stripVariant}
        animate={hover ? 'hover' : 'initial'}
        overflow="hidden"
      >
        {background && (
          <Box sx={{ mixBlendMode: 'luminosity' }}>
            <Image alt={name} src={background} width={200} height={200} />
          </Box>
        )}
      </Box>
      <Box
        component={motion.div}
        variants={labelVariant}
        animate={hover ? 'hover' : 'initial'}
        sx={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', textOverflow: 'clip' }}
      >
        <Typography align="center">{name}</Typography>
      </Box>
    </Stack>
  );
};
