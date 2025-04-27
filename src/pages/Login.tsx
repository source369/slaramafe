import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const onSubmit = async (data: any) => {
    try {
      console.log('Login Attempt:', data);
      setSnackbar({ open: true, message: 'Login successful (mock)!', severity: 'success' });
      reset();
    } catch (error) {
      console.error('Login Error:', error);
      setSnackbar({ open: true, message: 'Failed to login.', severity: 'error' });
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={6}>
      <Typography variant="h4" mb={3}>Login</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            fullWidth
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
