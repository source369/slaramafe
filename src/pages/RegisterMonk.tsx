import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  nicOrPassport: yup.string().required('NIC or Passport is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone Number is required')
});

export default function RegisterMonk() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const onSubmit = async (data: any) => {
    try {
      console.log('Registered Monk:', data);
      setSnackbar({ open: true, message: 'Monk registered successfully!', severity: 'success' });
      reset();
    } catch (error) {
      console.error('Registration Error:', error);
      setSnackbar({ open: true, message: 'Failed to register monk.', severity: 'error' });
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" mb={3}>Register New Monk</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            fullWidth
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
            label="NIC or Passport"
            fullWidth
            {...register('nicOrPassport')}
            error={!!errors.nicOrPassport}
            helperText={errors.nicOrPassport?.message}
          />

          <TextField
            label="Email Address"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone Number"
            fullWidth
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Monk'}
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
