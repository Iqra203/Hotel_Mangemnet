// File: src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import loginImage from '../assets/images/6333040-removebg-preview.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, role, name } = res.data;
      localStorage.setItem('user', JSON.stringify({ token, role, name }));

      if (role === 'admin') navigate('/');
      else if (role === 'staff') navigate('/staff-dashboard');
      else navigate('/user-dashboard');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh', p: 6, pl: 22}}>
      {/* Left Side - Login Form */}
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
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Login
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e65a28' } }}
          >
            Login
          </Button>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#ff6b35', textDecoration: 'none', fontWeight: 500 }}>
              Register now
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Right Side - Image */}
      <Grid
        item
        xs={false}
        md={8}
        sx={{
          backgroundColor: '#ff6b35',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt="Login illustration"
          sx={{ width: '80%', maxHeight: '90%' }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;
