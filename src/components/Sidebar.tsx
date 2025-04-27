import React from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240 } as any}>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Login" />
        </ListItemButton>
        <ListItemButton component={Link} to="/register-monk">
          <ListItemText primary="Register Monk" />
        </ListItemButton>
        <ListItemButton component={Link} to="/stay-request">
          <ListItemText primary="Stay Request" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;