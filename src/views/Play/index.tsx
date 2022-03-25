import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import DataDrawer from './DataDrawer';
import * as Visuals from './Visuals';
import * as Sound from './Sound';

const Play: FC = () => {
  const { t } = useTranslation('common');
  const { data } = useAppState();
  const { parseData } = useActions();
  const navigate = useNavigate();
  const { sample } = useParams();
  const { width, height } = useWindowSize();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (sample) {
      loadData(sample);
      return;
    }

    if (data.length === 0) return navigate('/');
    start();
  }, []);

  const loadData = async (name: string) => {
    const response = await parseData(`/data/${name}.csv`);
    if (response !== true) return navigate('/');
    start();
  };

  const start = () => {
    Visuals.start();
    Sound.play(data);
  };

  const handleShowData = () => setShowData(true);
  const handleHideData = () => setShowData(false);
  const handleBackButton = () => navigate('/');

  return (
    <Box>
      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleBackButton}
            size="small"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
          <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sensing Sugar
          </Typography>
          <Button color="inherit" onClick={handleShowData} size="small" sx={{ borderRadius: 4 }}>
            {t('show_data_source')}
          </Button>
        </Toolbar>
      </AppBar>
      <canvas
        id="visuals"
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Drawer anchor="right" open={showData} onClose={handleHideData}>
        <DataDrawer />
      </Drawer>
    </Box>
  );
};

export default Play;
