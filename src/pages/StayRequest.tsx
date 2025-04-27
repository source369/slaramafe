import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { submitStayRequest } from '../api/slaramaApi';

const StayRequest = () => {
  const [formData, setFormData] = useState({
    monkName: '',
    passport: '',
    arrivalDate: '',
    departureDate: '',
    comments: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitStayRequest(formData);
      setSnackbar({ open: true, message: 'Stay request submitted successfully!', severity: 'success' });
      setFormData({ monkName: '', passport: '', arrivalDate: '', departureDate: '', comments: '' });
    } catch (error) {
      console.error('Submit Error:', error);
      setSnackbar({ open: true, message: 'Failed to submit stay request.', severity: 'error' });
    }
  };

  return (
    <Box maxWidth={500} mx="auto">
      <Typography variant="h5" mb={2}>Request to Stay</Typography>

      <TextField fullWidth label="Monk Name" name="monkName" value={formData.monkName} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="NIC or Passport" name="passport" value={formData.passport} onChange={handleChange} margin="normal" />
      <TextField fullWidth type="date" label="Arrival Date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="normal" />
      <TextField fullWidth type="date" label="Departure Date" name="departureDate" value={formData.departureDate} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="normal" />
      <TextField fullWidth label="Comments" name="comments" value={formData.comments} onChange={handleChange} multiline rows={3} margin="normal" />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit Request
      </Button>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StayRequest;
