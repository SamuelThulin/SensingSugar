import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sound from './Sound';
import * as Visuals from './Visuals';

const Playground: FC = () => {
  const navigate = useNavigate();

  const handleClickPlayground = () => navigate('/');

  const handlePlaySimple = () => Sound.playSimple();
  const handlePlayTime = () => Sound.playTimeControl();
  const handlePlaySequence = () => Sound.playSquence();
  const handlePlayScheduling = () => Sound.playScheduling();
  const handlePlayInstrument = () => Sound.playInstruments();
  const handlePlaySamples = () => Sound.playSamples();
  const handlePlaySampler = () => Sound.playSampler();
  const handlePlayEffects = () => Sound.playEffectts();
  const handlePlaySignal = () => Sound.playSignal();

  const handleStartHydra = () => Visuals.start();
  const handlefx1 = () => Visuals.fx1();
  const handlefx2 = () => Visuals.fx2();

  return (
    <Stack alignItems="center" justifyContent="center" gap={7} pt={1}>
      <Stack direction="row" alignItems="left" width="100%" px={2}>
        <IconButton color="info" onClick={handleClickPlayground} size="small">
          <HomeIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Typography align="center" color="secondary" component="h1" variant="h1">
        Sensing Sugar
      </Typography>
      <Box>
        <Stack justifyContent="center" gap={2}>
          <Typography align="center" color="secondary" component="h2" variant="h4">
            Tone JS
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handlePlaySimple}>Simple</Button>
            <Button onClick={handlePlayTime}>Time</Button>
            <Button onClick={handlePlaySequence}>Sequence</Button>
            <Button onClick={handlePlayScheduling}>Scheduling</Button>
            <Button onClick={handlePlayInstrument}>Instrument</Button>
            <Button onClick={handlePlaySamples}>Samples</Button>
            <Button onClick={handlePlaySampler}>Sampler</Button>
            <Button onClick={handlePlayEffects}>Effects</Button>
            <Button onClick={handlePlaySignal}>Signal</Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <Box>
        <Stack justifyContent="center" gap={2}>
          <Typography align="center" color="secondary" component="h2" variant="h4">
            Hydra
          </Typography>
          <Box margin="auto">
            <Button onClick={handleStartHydra} variant="outlined">
              Start
            </Button>
          </Box>
          <Box margin="auto">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={handlefx1}>fx1</Button>
              <Button onClick={handlefx2}>fx2</Button>
            </ButtonGroup>
          </Box>
          <Box>
            <canvas
              id="visuals"
              width={1280}
              height={1024}
              style={{
                position: 'absolute',
                top: 700,
                left: 0,
                zIndex: -1,
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Playground;
