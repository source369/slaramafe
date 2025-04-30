import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Dashboard() {
  return (
    <Box>
      {/* Welcome Section */}
      <Typography variant="h4" fontWeight={600} mb={2}>
        Welcome to SLArama Monk Management System
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Manage monks, stay requests, and temple operations seamlessly.
      </Typography>

      {/* Quick Info Cards */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Paper elevation={3} sx={{ flex: '1 1 300px', p: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={500}>
            Total Registered Monks
          </Typography>
          <Typography variant="h4" color="primary" mt={1}>
            24
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ flex: '1 1 300px', p: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={500}>
            Pending Stay Requests
          </Typography>
          <Typography variant="h4" color="primary" mt={1}>
            3
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ flex: '1 1 300px', p: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={500}>
            Active Visiting Monks
          </Typography>
          <Typography variant="h4" color="primary" mt={1}>
            7
          </Typography>
        </Paper>
      </Box>

      {/* Inspirational Quote */}
      <Box mt={6} p={3} textAlign="center">
        <Typography variant="h6" color="textSecondary" fontStyle="italic">
          "Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared."
        </Typography>
      </Box>
    </Box>
  );
}
