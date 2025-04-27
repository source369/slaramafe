import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

const schema = yup.object().shape({
  monkName: yup.string().required('Monk Name is required'),
  passport: yup.string().required('Passport/NIC is required'),
  arrivalDate: yup.date().required('Arrival Date is required'),
  departureDate: yup.date().required('Departure Date is required'),
  comments: yup.string()
});

export default function StayRequest() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const onSubmit = async (data: any) => {
    try {
      console.log('Submitting stay request:', data);
      setSnackbar({ open: true, message: 'Stay request submitted successfully!', severity: 'success' });
      reset();
    } catch (error) {
      console.error('Submit Error:', error);
      setSnackbar({ open: true, message: 'Failed to submit stay request.', severity: 'error' });
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" mb={3}>Stay Request</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Monk Name"
            fullWidth
            {...register('monkName')}
            error={!!errors.monkName}
            helperText={errors.monkName?.message}
          />

          <TextField
            label="NIC or Passport"
            fullWidth
            {...register('passport')}
            error={!!errors.passport}
            helperText={errors.passport?.message}
          />

          <TextField
            label="Arrival Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('arrivalDate')}
            error={!!errors.arrivalDate}
            helperText={errors.arrivalDate?.message}
          />

          <TextField
            label="Departure Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('departureDate')}
            error={!!errors.departureDate}
            helperText={errors.departureDate?.message}
          />

          <TextField
            label="Comments"
            fullWidth
            multiline
            rows={3}
            {...register('comments')}
          />

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
