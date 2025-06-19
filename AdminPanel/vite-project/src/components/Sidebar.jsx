import React from "react";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from '@mui/icons-material/People';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReportIcon from '@mui/icons-material/Report';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import HotelIcon from '@mui/icons-material/Hotel'; 
import HandymanIcon from '@mui/icons-material/Handyman';

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Users", icon: <PeopleIcon />, path: "/userTable" }, 
    { text: "Housekeeper", icon: <CleaningServicesIcon />, path: "/add-housekeeper" },
    { text: "Housekeeper-List", icon: <NoteAltIcon />, path: "/housekeeper-list" },
    { text: "Feedbacks", icon: <FeedbackIcon  />, path: "/feedback" },
    { text: "Reports", icon: <ReportIcon   />, path: "/reports" },
    { text: "Reports-List", icon: <NoteAltIcon   />, path: "/reports-list" }, 
    { text: "Maintenance", icon: <HandymanIcon   />, path: "/MaintenanceForm" }, 
    { text: "Maintenance-List", icon: <NoteAltIcon   />, path: "/MaintenanceTable" }, 
    { text: "Rooms", icon: <HotelIcon sx={{ color: '#fff' }}  />, path: "/rooms" },
    { text: "Rooms-List", icon: <NoteAltIcon sx={{ color: '#fff' }}  />, path: "/rooms-list" },
    { text: "Booking-Form", icon: <NoteAltIcon sx={{ color: '#fff' }}  />, path: "/rooms/68186c97c068004b55de561b/book" },
    { text: "Booking-List", icon: <NoteAltIcon sx={{ color: '#fff' }}  />, path: "/bookings" },
    { text: "System-Settings", icon: <SettingsIcon />, path: "/systemSetting" },
    { text: "DisplaySystemSetting", icon: <DisplaySettingsIcon  />, path: "/disSystemSetting" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", bgcolor: "#ff9800", color: "white" },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>LHMS</Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              bgcolor: location.pathname === item.path ? "#e58f1e" : "transparent",
              "&:hover": { bgcolor: "#e58f1e" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}
            primaryTypographyProps={{ style: { color: 'white' } }} 
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
