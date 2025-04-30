import React from 'react';
import { Box, Button, Stack, Snackbar, Alert, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const StayRequest = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        'https://xec1cw1izl.execute-api.us-east-1.amazonaws.com/dev/stay-request',
        data
      );

      if (response.status === 200 && response.data?.request) {
        setOpenSnackbar(true);
        reset();
      } else {
        console.warn('Unexpected response:', response);
        setErrorSnackbar(true);
      }
    } catch (err) {
      console.error('Stay request failed:', err);
      setErrorSnackbar(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>Stay Request</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Monk Name"
            {...register('monkName', { required: 'Monk Name is required' })}
            error={!!errors.monkName}
            helperText={errors.monkName ? (errors.monkName.message as string) : ''}
          />
          <TextField
            fullWidth
            type="date"
            label="Arrival Date"
            InputLabelProps={{ shrink: true }}
            {...register('arrivalDate', { required: 'Arrival date is required' })}
            error={!!errors.arrivalDate}
            helperText={errors.arrivalDate ? (errors.arrivalDate.message as string) : ''}
          />
          <TextField
            fullWidth
            type="date"
            label="Departure Date"
            InputLabelProps={{ shrink: true }}
            {...register('departureDate', { required: 'Departure date is required' })}
            error={!!errors.departureDate}
            helperText={errors.departureDate ? (errors.departureDate.message as string) : ''}
          />
          <TextField
            fullWidth
            label="Comments"
            multiline
            rows={3}
            {...register('comments')}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </Stack>
      </form>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Stay request submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={errorSnackbar} autoHideDuration={4000} onClose={() => setErrorSnackbar(false)}>
        <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          Failed to submit stay request. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StayRequest;
