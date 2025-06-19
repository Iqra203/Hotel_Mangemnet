import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  CircularProgress, Button, Stack, Box, Modal, Select, MenuItem
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UpdateBookingForm from './UpdateBookingForm';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState('');
  const [currentBookingId, setCurrentBookingId] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        setBookings(bookings.filter(booking => booking._id !== id));
      } catch (err) {
        console.error('Error deleting booking:', err);
      }
    }
  };

  const handleOpenUpdate = (booking) => {
    setSelectedBooking(booking);
    setIsUpdateOpen(true);
  };

  const handleUpdateBooking = (updated) => {
    setBookings(prev => prev.map(b => b._id === updated._id ? updated : b));
  };

  const handleOpenStatusModal = (booking) => {
    setStatusToUpdate(booking.status);
    setCurrentBookingId(booking._id);
    setStatusModalOpen(true);
  };

  const handleStatusSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bookings/${currentBookingId}`, {
        status: statusToUpdate
      });
  
      // Update the list of bookings in state
      setBookings(prev => prev.map(b => b._id === currentBookingId ? { ...b, status: statusToUpdate } : b));
  
      // Close the status modal after updating the status
      setStatusModalOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <TableContainer component={Paper} sx={{ mt: 3}}>
            <Typography variant="h6" sx={{ p: 2 }}>Booking List</Typography>
            <Table>
              <TableHead sx={{ backgroundColor: '#ff9800' }}>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Room Name</TableCell>
                  <TableCell>Room Price</TableCell>
                  <TableCell>Check-In Date</TableCell>
                  <TableCell>Check-Out Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.guestEmail}</TableCell>
                    <TableCell>{booking.guestPhone}</TableCell>
                    <TableCell>{booking.room?.name || 'N/A'}</TableCell>
                    <TableCell>₹{booking.room?.price || 'N/A'}</TableCell>
                    <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => handleOpenStatusModal(booking)}
                      >
                        {booking.status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1, backgroundColor: '#ff9800' }}
                          size="small"
                          onClick={() => handleOpenUpdate(booking)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ backgroundColor: '#f44336' }}
                          size="small"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal for Status Update */}
          <Modal open={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
            <Box sx={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h6">Update Booking Status</Typography>
              <Select
                value={statusToUpdate}
                onChange={(e) => setStatusToUpdate(e.target.value)}
                fullWidth
              >
                <MenuItem value="booked">booked</MenuItem>
                <MenuItem value="checked-in">checked-in</MenuItem>
                <MenuItem value="checked-out">checked-out</MenuItem>
                <MenuItem value="cancelled">cancelled</MenuItem>
              </Select>
              <Button variant="contained" color="success" onClick={handleStatusSave}>
                Save
              </Button>
            </Box>
          </Modal>

          <UpdateBookingForm
            open={isUpdateOpen}
            onClose={() => setIsUpdateOpen(false)}
            booking={selectedBooking}
            onUpdate={handleUpdateBooking}
          />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingList;