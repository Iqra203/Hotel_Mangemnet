import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const UpdateBookingForm = ({ open, onClose, booking, onUpdate }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    checkOutDate: '',
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        checkInDate: booking.checkInDate.slice(0, 10),
        checkOutDate: booking.checkOutDate.slice(0, 10),
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, formData);
      onUpdate(res.data.booking);  
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Booking</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} />
          <TextField label="Guest Email" name="guestEmail" value={formData.guestEmail} onChange={handleChange} />
          <TextField label="Guest Phone" name="guestPhone" value={formData.guestPhone} onChange={handleChange} />
          <TextField type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
          <TextField type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} variant="contained"
                          color="primary"
                          sx={{ mr: 1, backgroundColor: '#ff9800' }}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBookingForm;
