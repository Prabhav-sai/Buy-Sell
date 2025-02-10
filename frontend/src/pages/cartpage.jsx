import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Button, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../hooks/useAuthcontext";

const CartPage = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [otp, setOtp] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCartItems(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await axios.delete(`/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // const generateOtp = () => {
  //   return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  // };

  const handleCheckout = async () => {
    try {
      // const otpGenerated = generateOtp();
      // setOtp(otpGenerated);

      // const orders = cartItems.map(item => ({
      //   // buyerId: user.id,
      //   sellerId: item.seller._id,
      //   itemId: item._id,
      //   amount: item.price,
      //   // otp: otpGenerated
      // }));

      const response = await axios.post("/api/orders/", { }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      alert("Orders placed successfully! OTPs: " + response.data.orders.map(o => `Order ${o.orderId}: ${o.otp}`).join("\n"));
      setCartItems([]); // Clear the cart on the frontend
      setTotalPrice(0);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Your Cart</Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="200" image={item.imageUrl} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Category: {item.category}</Typography>
                <Typography variant="body2">Price: ₹{item.price}</Typography>
                <Typography variant="body2">Seller Name: {item.seller?.firstName} {item.seller?.lastName}</Typography>
                <Typography variant="body2">Seller Email: {item.seller?.email}</Typography>
                <IconButton onClick={() => handleRemove(item._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: "20px" }}>Total: ₹{totalPrice}</Typography>
      <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={handleCheckout}>
        Checkout
      </Button>
      {/* {otp && <Typography variant="h6" style={{ marginTop: "10px", color: "green" }}>Your OTP: {otp}</Typography>} */}
    </div>
  );
};

export default CartPage;
