import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import RegisterMonk from './pages/RegisterMonk';
import StayRequest from './pages/StayRequest';

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar />
        <Box flexGrow={1} ml={30} p={3}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register-monk" element={<RegisterMonk />} />
            <Route path="/stay-request" element={<StayRequest />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;