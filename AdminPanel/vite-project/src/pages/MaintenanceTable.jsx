import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box
} from '@mui/material';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const MaintenanceTable = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch maintenance records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/maintenance');
        if (Array.isArray(res.data)) {
          setMaintenanceRecords(res.data);
        } else {
          console.error("Response is not an array:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch maintenance data:", err);
      }
    };
    fetchData();
  }, []);

  // Delete maintenance record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/maintenance/${id}`);
      setMaintenanceRecords(prev => prev.filter(record => record._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Navigate to the update form page
  const handleUpdate = (id) => {
    navigate(`/maintenance/update/${id}`);  // Navigating to the update page with the record ID
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 2 }}>
        Maintenance Records
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: 'white' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#ff9800' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Room</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reported By</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Issue Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Assigned To</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reported At</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceRecords.length > 0 ? (
              maintenanceRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record._id}</TableCell>
                  <TableCell>{record.roomId?.name || 'N/A'}</TableCell>
                  <TableCell>{record.reportedBy?.name || 'N/A'}</TableCell>
                  <TableCell>{record.issueType}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.assignedTo?.name || 'Unassigned'}</TableCell>
                  <TableCell>{record.priority}</TableCell>
                  <TableCell>{new Date(record.reportedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleUpdate(record._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(record._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No maintenance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MaintenanceTable;