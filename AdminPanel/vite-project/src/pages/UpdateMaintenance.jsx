import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper, MenuItem
} from '@mui/material';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const UpdateMaintenance = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    roomId: '',
    reportedBy: '',
    issueType: '',
    description: '',
    assignedTo: '',
    priority: '',
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/maintenance/${id}`)
        .then(res => {
          // Ensure all values fallback to "" if undefined
          setFormData({
            roomId: res.data.roomId || '',
            reportedBy: res.data.reportedBy || '',
            issueType: res.data.issueType || '',
            description: res.data.description || '',
            assignedTo: res.data.assignedTo || '',
            priority: res.data.priority || '',
          });
        })
        .catch(err => {
          console.error("Failed to load maintenance record", err);
          setMessage("Failed to load data");
        });
    }
  }, [id]);
  

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/maintenance/${id}`, formData);
      setMessage("Maintenance record updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error updating record.");
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
              Update Maintenance Request
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
                {['Plumbing', 'Electrical', 'Furniture', 'HVAC', 'Appliance', 'Other'].map(type => (
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
                {['Low', 'Medium', 'High'].map(level => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68900' } }}
              >
                Update
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

export default UpdateMaintenance;
