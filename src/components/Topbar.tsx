import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

const Topbar = () => {
  const username = "Chief Monk"; // Later we can dynamically fetch this!

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 220px)`, // 220px is your Sidebar width
        ml: '220px', // Sidebar margin left
        backgroundColor: '#1976d2', // MUI primary blue
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
        {/* Left Side: App Title */}
        <Typography variant="h6" noWrap component="div">
          SLArama Monk Management
        </Typography>

        {/* Right Side: User Info */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {username}
          </Typography>
          <Avatar sx={{ bgcolor: '#fff', color: '#1976d2', width: 36, height: 36 }}>
            {username.charAt(0)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
