import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const RegisterMonk = () => {
  return (
    <Box maxWidth={500} mx="auto">
      <Typography variant="h5" mb={2}>Register New Monk</Typography>
      <TextField fullWidth label="Full Name" margin="normal" />
      <TextField fullWidth label="NIC or Passport" margin="normal" />
      <TextField fullWidth label="Email Address" margin="normal" />
      <TextField fullWidth label="Phone Number" margin="normal" />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register Monk
      </Button>
    </Box>
  );
};

export default RegisterMonk;