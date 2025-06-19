// components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Button variant="contained" color="#BE3D2A" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
