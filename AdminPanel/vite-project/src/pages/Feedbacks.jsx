import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks from the API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback'); // Adjust URL as needed
        // Ensure the data is an array
        setFeedbacks(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ p: 2, color: '#28282B', fontWeight: 'bold', fontSize: '29px'  }}>
                    Users Feedbacks
                  </Typography>
          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#ff9800' }}>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Guest Name</TableCell>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room</TableCell>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Comment</TableCell>
                      <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feedbacks.map((feedback) => (
                      <TableRow key={feedback._id}>
                        <TableCell>{feedback.guestName}</TableCell>
                        <TableCell>{feedback.email}</TableCell>
                        <TableCell>{feedback.room ? feedback.room.name : 'N/A'}</TableCell>
                        <TableCell>{feedback.rating}</TableCell>
                        <TableCell>{feedback.comment}</TableCell>
                        <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
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

export default Feedbacks;
