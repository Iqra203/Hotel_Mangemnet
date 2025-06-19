import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../comA/Header';
import Footer from '../comA/Footer';
import Carousal from '../components/layout/Caruosel';

const UserMaintenanceForm = () => {
  const location = useLocation();
  const roomFromState = location.state?.roomNumber || '';

  const [formData, setFormData] = useState({
    roomId: roomFromState,
    reportedBy: '',
    issueType: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setFormData((prev) => ({
        ...prev,
        reportedBy: storedUser._id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/maintenance', formData);
      setMessage('Maintenance request submitted successfully!');
      setFormData({
        roomId: roomFromState,
        reportedBy: formData.reportedBy,
        issueType: '',
        description: '',
        assignedTo: '',
        priority: 'Medium',
      });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error submitting request.');
    }
  };

  return (
    <>
    <Header />
    <Carousal />
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", pb: 6 }}>
      <Paper elevation={3} sx={{ width: 500, p: 4, bgcolor: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
          Report Maintenance Issue
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Room ID"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
          />
          <TextField
            label="Reported By (User ID)"
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            required
          />
          <TextField
            label="Issue Type"
            name="issueType"
            select
            value={formData.issueType}
            onChange={handleChange}
            required
          >
            {['Plumbing', 'Electrical', 'Furniture', 'HVAC', 'Appliance', 'Other'].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <TextField
            label="Assigned To (Staff ID)"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          />
          <TextField
            label="Priority"
            name="priority"
            select
            value={formData.priority}
            onChange={handleChange}
          >
            {['Low', 'Medium', 'High'].map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68900' } }}>
            Submit
          </Button>
          {message && (
            <Typography sx={{ mt: 2, color: message.includes('success') ? 'green' : 'red' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
    <Footer />
    </>
  );
};

export default UserMaintenanceForm;
