import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DisplaySystemSetting = () => {
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/systemSetting');
      setSettings(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch settings');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/api/systemSetting');
      setMessage('Settings deleted successfully');
      setSettings(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: '#fff', minHeight: '100vh' }}>
        <Topbar />
        <Container sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: '#ff9800', fontWeight: 'bold' }}
            >
              System Settings
            </Typography>

            {message && (
              <Typography
                variant="body1"
                align="center"
                sx={{ mt: 1, color: '#ff9800' }}
              >
                {message}
              </Typography>
            )}

            {settings ? (
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ff9800' }}>
                    <TableCell>Standard Rate</TableCell>
                    <TableCell>Deluxe Rate</TableCell>
                    <TableCell>Suite Rate</TableCell>
                    <TableCell>Cancellation Policy</TableCell>
                    <TableCell>Service Tax</TableCell>
                    <TableCell>City Tax</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{settings.standardRate}</TableCell>
                    <TableCell>{settings.deluxeRate}</TableCell>
                    <TableCell>{settings.suiteRate}</TableCell>
                    <TableCell>{settings.cancellationPolicy}</TableCell>
                    <TableCell>{settings.serviceTax}%</TableCell>
                    <TableCell>{settings.cityTax}%</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ mr: 1, bgcolor: '#ff9800', '&:hover': { bgcolor: '#fb8c00' } }}
                        onClick={() => window.location.href = '/updateSystemSetting'}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Typography align="center" sx={{ mt: 3 }}>
                No system settings found.
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default DisplaySystemSetting;
