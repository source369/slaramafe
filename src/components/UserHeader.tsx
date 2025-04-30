import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

const UserHeader = () => {
  const username = "Chief Monk"; // You can dynamically fetch this later from auth

  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - 220px)`, ml: '220px', backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          SLArama Monk Management
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle1">{username}</Typography>
          <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>{username.charAt(0)}</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
