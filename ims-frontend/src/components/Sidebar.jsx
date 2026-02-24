import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  Box,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e293b",
          color: "#fff"
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          IMS System
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>

          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Clients - ADMIN only */}
          {role === "ADMIN" && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/clients">
                <ListItemText primary="Clients" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Estimates - All */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/estimates">
              <ListItemText primary="Estimates" />
            </ListItemButton>
          </ListItem>

          {/* Invoices - ADMIN only */}
          {role === "ADMIN" && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/invoices">
                <ListItemText primary="Invoices" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Payments - All */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/payments">
              <ListItemText primary="Payments" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </Drawer>
  );
}