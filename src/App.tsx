import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import RegisterMonk from './pages/RegisterMonk';
import StayRequest from './pages/StayRequest';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar />
        <Box flexGrow={1}>
          <Topbar />
          <Box mt={8} p={3}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register-monk" element={<RegisterMonk />} />
              <Route path="/stay-request" element={<StayRequest />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
