import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    TextField,
    Divider,
    Box,
    Tooltip,

    Button,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthcontext";
import { Link } from "react-router-dom";

const DeliverItemsPage = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    // Store OTP input for each order keyed by order ID
    const [otpInputs, setOtpInputs] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch all orders for the user
                const response = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                // Filter orders: only those where the current user is the seller and the order is not completed
                const pendingDeliveries = response.data.filter(
                    (order) =>
                        order.sellerId._id.toString() === user.user_details.id &&
                        !order.completed_status
                );
                console.log(response.data);
                setOrders(pendingDeliveries);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
            setLoading(false);
        };

        fetchOrders();
    }, []);

    const handleOtpChange = (orderId, value) => {
        setOtpInputs((prev) => ({ ...prev, [orderId]: value }));
    };

    const handleCompleteOrder = async (orderId) => {
        const otpValue = otpInputs[orderId];
        if (!otpValue) {
            alert("Please enter an OTP.");
            return;
        }
        try {
            await axios.post(
                "http://localhost:5000/api/orders/verify",
                { orderId, otp: otpValue },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert("Order completed successfully!");
            // Remove the completed order from the list
            setOrders((prev) => prev.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error("Error completing order:", error);
            alert("Failed to complete order. Please check the OTP and try again.");
        }
    };

    if (loading) {
        return (
            <Container sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Orders Pending Delivery
            </Typography>
            {orders.length === 0 ? (
                <Typography align="center">No orders pending delivery.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item key={order._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                {order.itemId?.imageUrl && (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={order.itemId.imageUrl}
                                        alt={order.itemId?.name || "Item Image"}
                                    />
                                )}
                                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    {/* Item Link */}
                                    <Typography
                                        component={Link}
                                        to={`/items/${order.itemId._id}`}
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontWeight: 600, color: "primary.main", textDecoration: "none" }}
                                    >
                                        Item: {order.itemId?.name || "N/A"}
                                    </Typography>

                                    {/* Divider between sections */}
                                    <Divider sx={{ mb: 2 }} />

                                    {/* Buyer Info */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                            Buyer Information
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Name:</strong> {order.buyerId?.firstName} {order.buyerId?.lastName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                                            <strong>Email:</strong>{" "}
                                            <Tooltip title={order.buyerId?.email || "No Email"} arrow>
                                                <span>{order.buyerId?.email}</span>
                                            </Tooltip>
                                        </Typography>
                                    </Box>

                                    {/* Seller Info */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                            Seller Information
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Name:</strong> {order.sellerId?.firstName} {order.sellerId?.lastName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                                            <strong>Email:</strong>{" "}
                                            <Tooltip title={order.sellerId?.email || "No Email"} arrow>
                                                <span>{order.sellerId?.email}</span>
                                            </Tooltip>
                                        </Typography>
                                    </Box>

                                    {/* Amount & Order ID */}
                                    <Typography variant="body2">
                                        <strong>Amount:</strong> ₹{order.amount}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Order ID:</strong> {order._id}
                                    </Typography>

                                    {/* OTP Input & Button */}
                                    <TextField
                                        label="Enter OTP"
                                        variant="outlined"
                                        fullWidth
                                        value={otpInputs[order._id] || ""}
                                        onChange={(e) => handleOtpChange(order._id, e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleCompleteOrder(order._id)}
                                        sx={{
                                            transition: "background-color 0.3s ease",
                                            "&:hover": { backgroundColor: "primary.dark" },
                                        }}
                                    >
                                        Complete Order
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default DeliverItemsPage;