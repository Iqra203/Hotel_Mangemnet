import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // Fetch reports data from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        console.log('Fetched reports:', response.data); // Log the data to check the format
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/reports/${id}`);
        setReports(reports.filter(report => report._id !== id)); // Remove deleted report from state
        alert('Report deleted successfully');
      } catch (error) {
        console.error('Error deleting report:', error);
      }
  };

  // Handle update action
  const handleUpdate = (id) => {
    navigate(`/update-report/${id}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom color="#ff9800">
                  Reports List
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="reports table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Report Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(reports) && reports.length > 0 ? (
                        reports.map((report) => (
                          <TableRow key={report._id}>
                            <TableCell>{report.reportName}</TableCell>
                            <TableCell>{report.description}</TableCell>
                            <TableCell>{report.status}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ mr: 1, backgroundColor: '#ff9800' }}
                                onClick={() => handleUpdate(report._id)}
                              >
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ backgroundColor: '#f44336' }}
                                onClick={() => handleDelete(report._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4}>No reports found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportsList;
