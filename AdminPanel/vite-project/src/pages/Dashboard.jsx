import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome Admin 👋</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">120</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Active Bookings</Typography>
              <Typography variant="h4">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Pending Tasks</Typography>
              <Typography variant="h4">9</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
