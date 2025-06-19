import React from 'react';
import Header from '../components/Header';

const AdminDashboard = () => {
  return (
    <>
    <Header />
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>You have full access to manage users, rooms, and settings.</p>
    </div>
    </>
  );
};

export default AdminDashboard;