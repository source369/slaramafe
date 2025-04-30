import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 220;

const Sidebar = () => {
  const location = useLocation(); // to manually check active route

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f5f5f5' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/dashboard'}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText>
                <NavLink
                  to="/dashboard"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}
                >
                  Dashboard
                </NavLink>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/register-monk'}>
              <ListItemIcon><PersonAddIcon /></ListItemIcon>
              <ListItemText>
                <NavLink
                  to="/register-monk"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}
                >
                  Register Monk
                </NavLink>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/stay-request'}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText>
                <NavLink
                  to="/stay-request"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}
                >
                  Stay Request
                </NavLink>
              </ListItemText>
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
