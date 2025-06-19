import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const HousekeeperList = () => {
  const [housekeepers, setHousekeepers] = useState([]);

  const fetchHousekeepers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/housekeepers');

      // If the API returns { housekeepers: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.housekeepers || [];

      setHousekeepers(data);
    } catch (err) {
      console.error('Failed to fetch housekeepers:', err);
    }
  };

  const deleteHousekeeper = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/housekeepers/${id}`);
      setHousekeepers(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error('Failed to delete housekeeper:', err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchHousekeepers();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 2 }}>
        Housekeepers List
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: 'white' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#ff9800' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {housekeepers.length > 0 ? (
              housekeepers.map((hk) => (
                <TableRow key={hk._id}>
                  <TableCell>{hk.name}</TableCell>
                  <TableCell>{hk.email}</TableCell>
                  <TableCell>{hk.phone}</TableCell>
                  <TableCell align="right">
                  <IconButton color="primary" onClick={() => navigate(`/edit-housekeeper/${hk._id}`)}>
                    <EditIcon />
                  </IconButton>
                    <IconButton color="error" onClick={() => deleteHousekeeper(hk._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No housekeepers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default HousekeeperList;
