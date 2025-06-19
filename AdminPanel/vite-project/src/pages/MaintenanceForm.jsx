import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    roomId: '',
    reportedBy: '',
    issueType: '',
    description: '',
    assignedTo: '',  // This should be the user ID (which will be converted to ObjectId in the backend)
    priority: '',
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
    
    // Validate ObjectId if needed
    // You can use `mongoose.Types.ObjectId.isValid()` to check validity

    try {
      await axios.post('http://localhost:5000/api/maintenance', formData);
      setMessage('Maintenance request submitted successfully!');
      setFormData({
        roomId: '',
        reportedBy: '',
        issueType: '',
        description: '',
        assignedTo: '',
        priority: '',
      });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error submitting request.');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 4, bgcolor: 'white' }}>
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
      </Box>
    </Box>
  );
};

export default MaintenanceForm;
