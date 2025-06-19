// src/pages/BookingBill.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingBill = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (error) {
        console.error('Failed to fetch booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return <Typography variant="h6" color="error">Booking not found.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          Booking Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Guest Name" secondary={booking.guestName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Guest Email" secondary={booking.guestEmail} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Guest Phone" secondary={booking.guestPhone} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Check-In Date" secondary={new Date(booking.checkInDate).toLocaleDateString()} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Check-Out Date" secondary={new Date(booking.checkOutDate).toLocaleDateString()} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Room ID" secondary={booking.room} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default BookingBill;
