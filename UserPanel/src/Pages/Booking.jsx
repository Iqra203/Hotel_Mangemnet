import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import Header from '../comA/Header';
import Carousal from '../components/layout/Caruosel';
import Footer from '../comA/Footer';

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to Sign Up if user is not logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signUp');
    }
  }, [navigate]);

  // Get room data from navigation state
  const { roomId, roomType, roomPrice, roomStatus } = location.state || {};

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    room: roomId || '',
    checkInDate: '',
    checkOutDate: '',
    status: 'booked'
  });

  const today = new Date().toISOString().split('T')[0];

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      setSuccess('Booking successful!');
      console.log('Booking Created:', response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <Header />
      <Carousal />
      <Container maxWidth="sm">
        <Box component={Paper} elevation={4} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Book Your Room
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Room Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Room Type:</strong> {roomType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Price per Night:</strong> ${roomPrice}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2"><strong>Status:</strong> {roomStatus}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Guest Name"
              name="guestName"
              fullWidth
              margin="normal"
              required
              value={formData.guestName}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Guest Email"
              name="guestEmail"
              fullWidth
              margin="normal"
              required
              type="email"
              value={formData.guestEmail}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Guest Phone"
              name="guestPhone"
              fullWidth
              margin="normal"
              required
              value={formData.guestPhone}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Check-in Date"
              name="checkInDate"
              fullWidth
              margin="normal"
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.checkInDate}
              onChange={handleChange}
              inputProps={{ min: today }}
              variant="outlined"
            />
            <TextField
              label="Check-out Date"
              name="checkOutDate"
              fullWidth
              margin="normal"
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.checkOutDate}
              onChange={handleChange}
              inputProps={{ min: today }}
              variant="outlined"
            />
            <TextField
              label="Room ID"
              name="room"
              fullWidth
              margin="normal"
              value={formData.room}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <TextField
              label="Status"
              name="status"
              fullWidth
              margin="normal"
              value={formData.status}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />

            {error && <Typography color="error" mt={1}>{error}</Typography>}
            {success && <Typography color="success.main" mt={1}>{success}</Typography>}

            <div className="flex justify-center">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300 mt-4 mb-4"
              >
                Submit Booking
              </button>
            </div>
          </form>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default BookingForm;
