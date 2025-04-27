import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Topbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#00695f' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Logged in as: Banthe Neo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;