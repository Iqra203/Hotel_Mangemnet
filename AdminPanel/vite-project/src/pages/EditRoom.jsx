import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    status: '',
    description: '',
    availability: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/${id}`)
      .then(res => {
        const room = res.data;
        setFormData({
          name: room.name || '',
          type: room.type || '',
          price: room.price || '',
          status: room.status || '',
          description: room.description || '',
          availability: room.availability || false
        });
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load room'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (image) data.append('image', image);

      await axios.put(`http://localhost:5000/api/rooms/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/rooms-list');
      alert('Record updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/rooms');

  if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: '#fff', minHeight: '100vh' }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <Container maxWidth="md" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#ff9800' }}>
              Edit Room
            </Typography>
            {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Room Name" name="name" value={formData.name} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} label="Type" onChange={handleChange}>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Double">Double</MenuItem>
                      <MenuItem value="Deluxe">Deluxe</MenuItem>
                      <MenuItem value="Suite">Suite</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Occupied">Occupied</MenuItem>
                      <MenuItem value="Cleaning">Cleaning</MenuItem>
                      <MenuItem value="Maintenance">Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Availability</InputLabel>
                    <Select name="availability" value={String(formData.availability)} label="Availability" onChange={handleChange}>
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Description" name="description" multiline rows={4} value={formData.description} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#e68900' } }}>
                    Change Image
n                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                  </Button>
                  {image && <Typography variant="body2" sx={{ mt: 1 }}>{image.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="submit" fullWidth variant="contained" disabled={saving} sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#e68900' } }}>
                      {saving ? 'Updating...' : 'Update Room'}
                    </Button>
                    <Button variant="outlined" fullWidth onClick={handleCancel} disabled={saving}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default EditRoom;
