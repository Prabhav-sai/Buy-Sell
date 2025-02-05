import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Container,
    CardMedia,
    Tabs,
    Tab,
    Box,
    Button,
    TextField,
    Divider,
    Tooltip,
    Paper,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthcontext";
import { Link } from "react-router-dom";


const OrdersPage = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainTab, setMainTab] = useState(0); // 0: Pending, 1: Completed
    const [completedSubTab, setCompletedSubTab] = useState(0); // 0: As Buyer, 1: As Seller

    // Always call hooks at the top of the component
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user.token]);

    const handleGenerateOtp = async (orderId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/orders/updateotp",
                { orderId },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert(response.data.message + " OTP: " + response.data.otp);
        } catch (error) {
            console.error("Error generating OTP:", error)
            alert("Failed to generate OTP. Please try again.");
        }
    };

    // Use useMemo hooks unconditionally
    const pendingOrders = useMemo(() => {
        return orders.filter((order) => (!order.completed_status) && (order.sellerId._id.toString() !== user.user_details.id));
    }, [orders]);

    const completedOrders = useMemo(() => {
        return orders.filter((order) => order.completed_status);
    }, [orders]);

    const completedAsBuyer = useMemo(() => {
        return completedOrders.filter(
            (order) => order.buyerId._id.toString() === user.user_details.id
        );
    }, [completedOrders]);

    const completedAsSeller = useMemo(() => {
        return completedOrders.filter(
            (order) => order.sellerId._id.toString() === user.user_details.id
        );
    }, [completedOrders]);

    // Render a loading indicator if loading is true.
    // This early return is safe as all hooks above are called unconditionally.


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
                Your Orders
            </Typography>

            {/* Main Tabs: Pending vs. Completed Orders */}
            <Paper elevation={2} sx={{ mb: 2 }}>
                <Tabs
                    value={mainTab}
                    onChange={(e, newValue) => setMainTab(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label={`Pending (${pendingOrders.length})`} />
                    <Tab label={`Completed (${completedOrders.length})`} />
                </Tabs>
            </Paper>

            {mainTab === 0 && (
                <OrderList orders={pendingOrders} title="Pending Orders" handleGenerateOtp={handleGenerateOtp} />
            )}

            {mainTab === 1 && (
                <Box>
                    {/* Sub-tabs for Completed Orders: As Buyer and As Seller */}
                    <Paper elevation={1} sx={{ mb: 2 }}>
                        <Tabs
                            value={completedSubTab}
                            onChange={(e, newValue) => setCompletedSubTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label={`As Buyer (${completedAsBuyer.length})`} />
                            <Tab label={`As Seller (${completedAsSeller.length})`} />
                        </Tabs>
                    </Paper>
                    {completedSubTab === 0 && (
                        <OrderList
                            orders={completedAsBuyer}
                            title="Completed Orders (As Buyer)"
                        />
                    )}
                    {completedSubTab === 1 && (
                        <OrderList
                            orders={completedAsSeller}
                            title="Completed Orders (As Seller)"
                        />
                    )}
                </Box>
            )}
        </Container>
    );
};

const OrderList = ({ orders, title, handleGenerateOtp }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <Grid container spacing={3} sx={{ mt: 1 }}>
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
                                    {/* Button */}
                                    {handleGenerateOtp && <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleGenerateOtp(order._id)}
                                        sx={{
                                            transition: "background-color 0.3s ease",
                                            "&:hover": { backgroundColor: "primary.dark" },
                                        }}
                                    >
                                        Generate OTP
                                    </Button>}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default OrdersPage;
