import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAdminContext } from "../Contexts/IsAdmin";
import { Box } from "@mui/material";

const Navbar: React.FC = () => {
  const { isAdminUser, toggleAdmin } = useAdminContext();

  const handleModeChange = () => {
    toggleAdmin();
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {isAdminUser ? "Admin Dashboard" : "User Dashboard"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            User
          </Typography>
          <Switch
            checked={isAdminUser}
            onChange={handleModeChange}
            inputProps={{ "aria-label": "toggle between admin and user mode" }}
          />
          <Typography variant="body2" color="textSecondary">
            Admin
          </Typography>
        </Box>
        <IconButton
          size="large"
          aria-label="logout"
          color="inherit"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
