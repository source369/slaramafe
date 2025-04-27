import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const Login = () => {
  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h5" mb={2}>Monk/Admin Login</Typography>
      <TextField fullWidth label="Username" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;