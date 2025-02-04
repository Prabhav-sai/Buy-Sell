import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // onSearch(searchTerm);
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: { xs: "6px", sm: "8px 16px" } }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left Side: Menu Button */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: "block", md: "block" } }}>
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", display: { xs: "none", md: "block" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Buy-Sell @ IIITH
            </Link>
        </Typography>

        {/* Search Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "4px 12px",
            width: { xs: "70%", sm: "50%", md: "40%" }, // Responsive width
          }}
        >
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ flexGrow: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Search on Enter key press
          />
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 1, textTransform: "none" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
