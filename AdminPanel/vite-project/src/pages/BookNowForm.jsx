import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


const BookNowForm = () => {
  const { roomId } = useParams(); // or pass roomId as prop if needed
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState(null);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/bookings/room/${roomId}`); 
        const res = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
        setRoomDetails(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load room info', err);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        room: roomId
      });
      alert('Booking successful!');
      navigate('/'); // or redirect to bookings list
    } catch (error) {
      alert('Booking failed!');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
          <Topbar />
          <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="center" mt={5}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 480 }}>
          <Typography variant="h5" mb={3}>
            Book Room
          </Typography>
  
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Read-only room fields */}
              <Grid item xs={12}>
                <TextField
                  label="Room Name"
                  value={roomDetails.name}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Room Price"
                  value={`$${roomDetails.price}`}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Room Status"
                  value={roomDetails.status}
                  fullWidth
                  disabled
                />
              </Grid>
  
              {/* Guest input fields */}
              <Grid item xs={12}>
                <TextField
                  label="Guest Name"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Guest Email"
                  name="guestEmail"
                  value={formData.guestEmail}
                  onChange={handleChange}
                  required
                  fullWidth
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Guest Phone"
                  name="guestPhone"
                  value={formData.guestPhone}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Check-In Date"
                  name="checkInDate"
                  type="date"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Check-Out Date"
                  name="checkOutDate"
                  type="date"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1, backgroundColor: '#ff9800' }}
                  disabled={submitting}
                >
                  {submitting ? 'Booking...' : 'Book Now'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  };

export default BookNowForm;