import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const RoomForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    status: '',
    description: '',
    availability: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });
      if (image) data.append('image', image);

      const response = await axios.post('http://localhost:5000/api/rooms', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Room created successfully!');
      setFormData({ name: '', type: '', price: '', status: '', description: '', availability: false });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#fff", minHeight: "100vh" }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
        <Container maxWidth="sm" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#ff9800' }}>
        Create New Room
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Room Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
                <MenuItem value="Deluxe">Deluxe</MenuItem>
                <MenuItem value="Suite">Suite</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                name="availability"
                value={String(formData.availability)}
                label="Availability"
                onChange={(e) => setFormData({ ...formData, availability: e.target.value === 'true' })}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#e68900' } }}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {image && <Typography variant="body2" sx={{ mt: 1 }}>{image.name}</Typography>}
          </Grid>

          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#e68900' } }}
            >
              {loading ? 'Submitting...' : 'Create Room'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={4}>
              <Typography color="error" align="center">{error}</Typography>
            </Grid>
          )}

          {success && (
            <Grid item xs={4}>
              <Typography color="success.main" align="center">{success}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomForm;
