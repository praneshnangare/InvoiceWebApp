import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TableViewIcon from "@mui/icons-material/TableView";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReceiptIcon from "@mui/icons-material/Receipt";
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import BusinessIcon from '@mui/icons-material/Business';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import { useNavigate } from "react-router-dom";
import useAuth from "../features/login/useAuth";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" && prop !== "isBrowser"})(
  ({ theme, open, isBrowser }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open &&
      isBrowser && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isBrowser",
})(({ theme, open, isBrowser }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    isBrowser && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const createMenuItems = (logout) => {
  return [
    {
      label: "Invoices",
      icon: <ReceiptIcon />,
      subMenu: [
        {
          label: "Create Invoice",
          value: "/create-invoices",
          icon: <CreateIcon />,
        },
        {
          label: "View Invoices",
          value: "/view-invoices",
          icon: <TableViewIcon />,
        },
      ],
    },
    {
      label : "Inventory Management",
      icon: <IceSkatingIcon />,
      subMenu: [
        {
          label: "Inventory",
          value: "/inventory",
          icon: <FileDownloadIcon />,
        },
        {
          label: "Purchase",
          value: "/inventory/purchase",
          icon: <FileDownloadIcon />,
        },
        {
          label: "Sales",
          value: "/inventory/sales",
          icon: <FileUploadIcon />,
        },
        {
          label: "Inward",
          value: "/inventory/inward",
          icon: <FileUploadIcon />,
        },
        {
          label: "Outward",
          value: "/inventory/outward",
          icon: <FileUploadIcon />,
        },
      ],
    },
    {
      label: "trial",
      value: "/trial"
    },
    {
      label: "Logout",
      value: "/logout",
      action: logout,
      icon: <LogoutIcon />,
    },
  ];
};

export default function PersistentDrawerLeft({header}) {
  const theme = useTheme();
  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(isBrowser ? true : false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = React.useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const MENU_ITEMS = createMenuItems(logout);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuClick = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box sx={{ display: "flex", height:"auto" }}>
      <AppBar position="fixed" open={open} isBrowser={isBrowser}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {header ?? "Pranesh Enterprises"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        docked={"false"}
        variant={isBrowser ? "persistent" : "temporary"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                key={index}
                disablePadding
                onClick={() => 
                  item.action
                    ? item.action()
                    : item.subMenu
                    ? handleSubMenuClick(index)
                    : navigate(item.value)
                }
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.subMenu ? (
                    openSubMenuIndex === index ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>
              </ListItem>
              {item.subMenu ? (
                <Collapse
                  in={openSubMenuIndex === index}
                  sx={{ ml: 3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subMenu.map((subMenuItem, subIndex) => (
                      <ListItemButton key={subIndex + "1"} onClick={() => 
                        subMenuItem.action
                          ? item.action()
                          : navigate(subMenuItem.value)
                      }>
                        <ListItemIcon>{subMenuItem.icon}</ListItemIcon>
                        <ListItemText primary={subMenuItem.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              ) : null}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Main open={open}isBrowser={isBrowser}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
