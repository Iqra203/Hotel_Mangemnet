// SignupPage.jsx
import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import signUpImage from '../assets/images/signup.png';

const SignupForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert('Registered! Please login.');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh', p: 6, pl: 18 }}>
      {/* Left Column - Signup Form */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
          p: 4,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Sign Up
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e65a28' } }}
          >
            Sign Up
          </Button>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ff6b35', textDecoration: 'none', fontWeight: 500 }}>
              Login now
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Right Column - Image */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          backgroundColor: '#ff6b35',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          component="img"
          src={signUpImage}
          alt="Signup illustration"
          sx={{ width: '95%', maxHeight: '110%', opacity: 0.9 }}
        />
      </Grid>
    </Grid>
  );
};

export default SignupForm;
