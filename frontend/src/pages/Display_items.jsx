import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Container, CardMedia, TextField, InputAdornment, Checkbox, FormControlLabel, FormGroup, Slider, Button, Paper, FormControl, FormLabel } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthcontext.jsx";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Predefined categories list (case-insensitive matching)
const categories = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Sports',
  'Stationery',
  'Other'
].map(cat => cat.toLowerCase());

const DisplayItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    filterItems();
  };

  const filterItems = () => {
    const filtered = items.filter(item => {
      // Search filter (case-insensitive)
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

      // Category filter (any selected category match)
      const itemCategory = item.category?.toLowerCase() || '';
      const matchesCategory = selectedCategories.size === 0 ||
        Array.from(selectedCategories).some(cat =>
          categories.includes(cat) &&
          itemCategory === cat
        );

      return matchesSearch && matchesPrice && matchesCategory;
    });

    setFilteredItems(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories(new Set());
    setPriceRange([0, 100000]);
    setFilteredItems(items);
  };

  const handleCategoryChange = (category) => {
    const newSelected = new Set(selectedCategories);
    newSelected.has(category) ? newSelected.delete(category) : newSelected.add(category);
    setSelectedCategories(newSelected);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Items
      </Typography>

      {/* Filters Form */}
      <Paper component="form" onSubmit={handleApplyFilters} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Items"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Price Filter */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</FormLabel>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={1}
              />
            </FormControl>
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Select Categories</FormLabel>
              <FormGroup row>
                {categories.map(category => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.has(category)}
                        onChange={() => handleCategoryChange(category)}
                        name={category}
                      />
                    }
                    label={category.charAt(0).toUpperCase() + category.slice(1)}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Grid */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Card component={Link} to={`/items/${item._id}`} sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl || "https://via.placeholder.com/200"}
                    alt={item.name}
                    sx={{ objectFit: 'contain' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{item.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Category: {item.category || 'Uncategorized'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Seller: {item.seller?.email || 'Unknown'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" sx={{ p: 4 }}>
                No items found matching your filters
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default DisplayItems;