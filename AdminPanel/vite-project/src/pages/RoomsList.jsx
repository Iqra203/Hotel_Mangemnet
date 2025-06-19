import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rooms');
      setRooms(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load rooms');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      setRooms(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/rooms/edit/${id}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: '#fff', minHeight: '100vh' }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <Container maxWidth="lg" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#ff9800' }}>
              Rooms List
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#ff9800' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Type</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Price</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Availability</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map(room => (
                    <TableRow key={room._id}>
                      <TableCell>{room.name}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.price}</TableCell>
                      <TableCell>{room.status}</TableCell>
                      <TableCell>{room.availability ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mr: 1, backgroundColor: '#ff9800' }}
                            size="small"
                            onClick={() => handleUpdate(room._id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(room._id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomsList;
