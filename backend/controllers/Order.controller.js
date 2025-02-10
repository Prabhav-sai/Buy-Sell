import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Order from "../models/Order.model.js";

// Function to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create Orders for Checkout
export const createOrders = async (req, res) => {
    try {
        const userId = req.user_id; // Extract user ID from request
        const user = await User.findById(userId).populate("cart");

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orders = [];
        for (const item of user.cart) {
            const otp = generateOTP();
            const otpHash = await bcrypt.hash(otp, 10); // Hash the OTP

            const newOrder = new Order({
                transaction_id: new mongoose.Types.ObjectId(),
                buyerId: userId,
                sellerId: item.seller,
                itemId: item._id,
                amount: item.price,
                otpHash,
            });

            await newOrder.save();
            orders.push({ orderId: item.name, otp }); // Send OTP to user
        }

        // Clear the user's cart after checkout
        user.cart = [];
        await user.save();

        res.status(201).json({
            message: "Orders created successfully",
            orders, // Send OTPs back to the user
        });
    } catch (error) {
        console.error("Error creating orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user_id;
        // console.log("orders: "+userId);
        const orders = await Order.find({$or: [{ buyerId: userId }, { sellerId: userId }]}).populate("itemId").populate("sellerId").populate("buyerId");
        // console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyOrder = async (req, res) => {
    try {
        const { orderId, otp } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const isMatch = await bcrypt.compare(otp, order.otpHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        order.completed_status = true;
        await order.save();

        res.status(200).json({ message: "Order verified successfully" });
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updateOrderOtp = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user_id;

        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Verify if the user is the buyer
        // console.log(order.buyerId.toString(), userId._id.toString());
        
        if (order.buyerId.toString() !== userId._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update the OTP for this order" });
        }

        // Generate a new OTP
        const otp = generateOTP();
        const otpHash = await bcrypt.hash(otp, 10);

        // Update the OTP in the order
        order.otpHash = otpHash;
        await order.save();

        // Return the OTP and item name
        res.status(200).json({
            message: "OTP updated successfully",
            otp,
        });
    } catch (error) {
        console.error("Error updating OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};