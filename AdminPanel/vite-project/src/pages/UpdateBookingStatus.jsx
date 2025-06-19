import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateBookingStatus = ({ bookingId }) => {
  const [status, setStatus] = useState('');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Fetch booking details for the provided bookingId
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setBooking(response.data.booking);
        setStatus(response.data.booking.status);
      } catch (error) {
        toast.error('Failed to fetch booking details');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleStatusChange = async () => {
    try {
      await axios.put(`/api/bookings/${bookingId}`, { status });
      toast.success('Booking status updated successfully!');
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  return (
    <div>
      <h3>Booking Status</h3>
      {booking && (
        <>
          <p>Guest Name: {booking.guestName}</p>
          <p>Email: {booking.guestEmail}</p>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="booked">Booked</MenuItem>
              <MenuItem value="checked-in">Checked-In</MenuItem>
              <MenuItem value="checked-out">Checked-Out</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleStatusChange}>
            Update Status
          </Button>
        </>
      )}
    </div>
  );
};

export default UpdateBookingStatus;
