import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Grid
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthcontext';

const ItemPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setItem(response.data);
      } catch (err) {
        setError('Failed to fetch item details');
        console.error(err);
      }
      setLoading(false);
    };

    if (user) {
      fetchItem();
    }
  }, [itemId, user]);

  const handleAddToCart = async () => {
    // alert('yet to handle cart');
    try {
      const response = await axios.post(`/api/cart`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !item) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          {error || 'Item not found'}
        </Typography>
      </Container>
    );
  }
  // console.log(user.user_details.id);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Item Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              height="400"
              image={item.imageUrl || "https://via.placeholder.com/400"}
              alt={item.name}
              sx={{ objectFit: 'contain', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}
            />
          </Card>
        </Grid>

        {/* Item Information */}
        <Grid item xs={12} md={6}>
          <CardContent>
            {/* Item Name */}
            <Typography variant="h3" gutterBottom>
              {item.name}
            </Typography>

            {/* Price */}
            <Typography variant="h5" color="primary" gutterBottom>
              ₹{item.price}
            </Typography>

            {/* Item Description */}
            <Typography variant="body1" paragraph>
              {item.description}
            </Typography>

            {/* Category */}
            <Typography variant="subtitle1" gutterBottom>
              <strong>Category:</strong> {item.category || 'Uncategorized'}
            </Typography>

            {/* Seller Info */}
            <Typography variant="subtitle2"  gutterBottom>
              <strong>Sold by:</strong> {item.seller?.email || 'Unknown Seller'}
            </Typography>

            {/* Add to Cart Button */}
            {user.user_details.id === item.seller?._id ? (
              <Typography color="textSecondary" variant="h4" sx={{ mt: 3 }}>
                <strong>You can't buy your own item.</strong>
              </Typography>
            ) : (
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  width: '100%',
                  '&:hover': { backgroundColor: 'primary.dark' },
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Container>

  );
};

export default ItemPage;