import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Or check your state for logged-in user

  if (!user) {
    return <Navigate to="/signIn" />; // Redirect to sign-in page if not logged in
  }

  return children; // Render the children (RoomFeatures) if logged in
};

export default ProtectedRoute;
