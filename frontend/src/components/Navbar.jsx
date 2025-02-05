import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    // { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Chatbot", icon: <ChatIcon />, path: "/chatbot" },
    { text: "Items", icon: <StoreIcon />, path: "/display_items" },
    { text: "Orders", icon: <ReceiptLongIcon />, path: "/orders" },
    { text: "Deliver", icon: <LocalShippingIcon />, path: "/deliver" },
    { text: "Cart", icon: <ShoppingCartIcon />, path: "/cart" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { text: "Logout" , icon: <LogoutIcon/>, path: "/logout" }
  ];

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: "#1976d2", 
      padding: { xs: "6px", sm: "8px 16px" },
      marginBottom: "20px"
    }}>
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        gap: 2
      }}>
        {/* Mobile Menu Button */}
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "bold", 
            flexGrow: { xs: 1, md: 0 },
            mr: { md: 4 }
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Buy-Sell @ IIITH
          </Link>
        </Typography>

        {/* Navigation Links (Desktop) */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          gap: 2,
          flexGrow: 1,
          justifyContent: "flex-end"
        }}>
          {navItems.map(({ text, icon, path }) => (
            <Button 
              key={text}
              color="inherit" 
              component={Link} 
              to={path}
              sx={{ textTransform: 'none', display: "flex", alignItems: "center", gap: 1 }}
            >
              {icon} {text}
            </Button>
          ))}
        </Box>
      </Toolbar>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
          <List>
            {navItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
