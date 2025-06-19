import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid
} from '@mui/material';
import axios from 'axios';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const SystemSettings = () => {
  const [formData, setFormData] = useState({
    standardRate: '',
    deluxeRate: '',
    suiteRate: '',
    cancellationPolicy: '',
    serviceTax: '',
    cityTax: ''
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
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/systemSetting', formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Paper elevation={3} sx={{ p: 4, bgcolor: 'white' }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                  Create System Settings
                </Typography>
        
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Standard Rate"
                        name="standardRate"
                        type="number"
                        value={formData.standardRate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Deluxe Rate"
                        name="deluxeRate"
                        type="number"
                        value={formData.deluxeRate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Suite Rate"
                        name="suiteRate"
                        type="number"
                        value={formData.suiteRate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cancellation Policy"
                        name="cancellationPolicy"
                        multiline
                        rows={3}
                        value={formData.cancellationPolicy}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Service Tax"
                        name="serviceTax"
                        type="number"
                        value={formData.serviceTax}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="City Tax"
                        name="cityTax"
                        type="number"
                        value={formData.cityTax}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>
        
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: '#ff9800',
                      '&:hover': { bgcolor: '#fb8c00' }
                    }}
                  >
                    Submit
                  </Button>
                </Box>
        
                {message && (
                  <Typography variant="body1" align="center" sx={{ mt: 2, color: '#ff9800' }}>
                    {message}
                  </Typography>
                )}
              </Paper>
            </Container>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SystemSettings;
