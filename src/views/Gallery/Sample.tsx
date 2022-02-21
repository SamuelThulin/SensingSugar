import { Box, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface SampleProps {
  id: string;
}

const Sample: FC<SampleProps> = ({ id }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const handleClick = () => navigate(`/play?sample=${id}`);

  const imageUrl = `./assets/images/${id}.png`;

  return (
    <Stack
      component={motion.div}
      alignItems="center"
      onClick={handleClick}
      spacing={1}
      m={1}
      whileHover={{ cursor: 'pointer' }}
    >
      <Box
        component={motion.img}
        whileHover={{
          y: -10,
          rotate: 1,
          borderRadius: 30,
          boxShadow: `0 0 8px 4px ${palette.primary.dark}`,
        }}
        src={imageUrl}
      />
      <Typography align="center" color="primary" component="h2" variant="h6">
        #{id}
      </Typography>
    </Stack>
  );
};

export default Sample;
