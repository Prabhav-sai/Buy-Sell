import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
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
        const response = await axios.get(`http://localhost:5000/api/items/${itemId}`, {
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
    alert('yet to handle cart');
    try {
      const response = await axios.post(`http://localhost:5000/api/cart`,
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={item.imageUrl || "https://via.placeholder.com/400"}
              alt={item.name}
              sx={{ objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ₹{item.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {item.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {item.category || 'Uncategorized'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Sold by: {item.seller?.email || 'Unknown Seller'}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ItemPage;