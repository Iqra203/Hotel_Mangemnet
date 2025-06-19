import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    Paper, TableContainer, Typography
  } from '@mui/material';

  const UserTable = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/users')
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/users/${id}`);
          setUsers(users.filter(user => user._id !== id));
        } catch (error) {
          console.error("Failed to delete user:", error);
        }
      };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh"}}>
        <Topbar />
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ p: 2, color: '#28282B', fontWeight: 'bold', fontSize: '29px'  }}>
        Registered Users
      </Typography>
        <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#ff9800' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserTable;
