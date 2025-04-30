import React from 'react';
import { Box, Button, Stack, Snackbar, Alert, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { registerMonk } from '../api/slaramaApi';

const RegisterMonk = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await registerMonk(data);
      console.log('API Response:', response); // Add this line
  
      if (response.status === 200 && response.data?.monk) {
        setOpenSnackbar(true);
        reset();
      } else {
        console.warn('Unexpected API response:', response);
        setErrorSnackbar(true);
      }
    } catch (error: any) {
      console.error('Axios error:', error);
      setErrorSnackbar(true);
    }
  };
  

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>Register Monk</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name ? (errors.name.message as string) : ''}
          />
          <TextField
            fullWidth
            type="number"
            label="Age"
            {...register('age', { required: 'Age is required' })}
            error={!!errors.age}
            helperText={errors.age ? (errors.age.message as string) : ''}
          />
          <TextField
            fullWidth
            label="Nationality"
            {...register('nationality', { required: 'Nationality is required' })}
            error={!!errors.nationality}
            helperText={errors.nationality ? (errors.nationality.message as string) : ''}
          />
          <TextField
            fullWidth
            label="Email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email ? (errors.email.message as string) : ''}
          />
          <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Monk'}
          </Button>
        </Stack>
      </form>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Monk Registered Successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={errorSnackbar} autoHideDuration={4000} onClose={() => setErrorSnackbar(false)}>
        <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          Failed to register monk. Try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterMonk;
