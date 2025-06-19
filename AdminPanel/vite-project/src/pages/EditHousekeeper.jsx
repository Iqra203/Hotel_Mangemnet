import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, Typography, Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from 'axios';

const EditHousekeeper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchHousekeeper = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/housekeepers/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching housekeeper:', err);
      }
    };
    fetchHousekeeper();
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/housekeepers/${id}`, form);
      navigate('/housekeeper-list'); 
      alert('Record updated successfully');
    } catch (err) {
      console.error('Error updating housekeeper:', err);
    }
  };

  return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
          <Topbar />
          <Box sx={{ p: 3 }}>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
                  <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 3 }}>
                      Edit Housekeeper
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth label="Name" name="name" value={form.name} onChange={handleChange}
                        margin="normal" required
                      />
                      <TextField
                        fullWidth label="Email" name="email" value={form.email} onChange={handleChange}
                        margin="normal" required
                      />
                      <TextField
                        fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange}
                        margin="normal" required
                      />
                      <Button
                        type="submit" variant="contained"
                        sx={{ bgcolor: '#ff9800', color: 'white', mt: 2, '&:hover': { bgcolor: '#fb8c00' } }}
                      >
                        Update
                      </Button>
                    </form>
                  </Paper>
                </Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  };

export default EditHousekeeper;
