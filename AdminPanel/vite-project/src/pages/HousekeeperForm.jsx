import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper
} from '@mui/material';
import axios from 'axios';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const HousekeeperForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/housekeepers', formData);
      setMessage('Housekeeper added successfully!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error adding housekeeper.');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 4, bgcolor: 'white' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
        Add Housekeeper
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68900' } }}>
          Add
        </Button>
        {message && (
          <Typography sx={{ mt: 2, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
      </Box>
    </Paper>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default HousekeeperForm;
