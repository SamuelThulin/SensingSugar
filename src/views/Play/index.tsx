import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import DataDrawer from './DataDrawer';
import * as Visuals from './Visuals';

const Play: FC = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    Visuals.start();
  }, []);

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
            Show data source
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
