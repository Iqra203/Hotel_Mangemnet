import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1, backgroundColor: '#ff9800' }}
                    size="small"
                    onClick={() => handleUpdate(booking._id)}
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
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;