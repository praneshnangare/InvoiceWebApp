import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Menu from "./Menu";
import MenuList from "./MenuList";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../features/login/useAuth";

const StyledMenuPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(180deg, #005C97 19.46%, #363795 122.95%)",
  borderRadius: "20px",
  padding: "30px 0px",
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  textTransform: "none",
}));

const MenuDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const handleLogout = () => {
    // Perform your logout logic here
    // For example, redirect to the login page or clear session data
    console.log("Logout clicked");
    logout();
  };

  const MENU_ITEMS = [
    {
      label: "Create Invoice",
      value: "/create-invoice",
    },
    {
      label: "View Invoices",
      value: "/view-invoices",
    },
    {
      label: "Logout",
      value: "/logout",
      isAction: true,
    },
  ];

  return (
    <>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          <ListItemButton
            onClick={() => handleMenuItemClick("/create-invoice")}
            selected={location.pathname === "/create-invoice"}
          >
            <ListItemIcon>{/* Add icon component here */}</ListItemIcon>
            <ListItemText primary="Create Invoice" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuItemClick("/view-invoices")}
            selected={location.pathname === "/view-invoices"}
          >
            <ListItemIcon>{/* Add icon component here */}</ListItemIcon>
            <ListItemText primary="View Invoices" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleLogout()}
            selected={location.pathname === "/logout"}
          >
            <ListItemIcon>{/* Add icon component here */}</ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
