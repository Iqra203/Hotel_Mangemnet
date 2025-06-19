// File: src/components/Topbar.js
import React from "react";
import { AppBar, Toolbar, IconButton, Box, Avatar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutButton from "./LogoutButton";

const Topbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#fff", color: "black", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f0f0f0", px: 2, py: 0.5, borderRadius: 2 }}>
          <SearchIcon sx={{ color: "#999" }} />
          <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
        </Box>

        {/* Profile & Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Avatar sx={{ bgcolor: "#ff9800" }}>A</Avatar>
          </IconButton>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
