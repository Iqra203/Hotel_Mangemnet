// components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutButton from './LogoutButton';

const Header = () => {
  // Safely get and parse user data
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || 'Guest';

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Welcome, {userName}
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;