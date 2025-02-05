import express from "express";
import { createOrders,getOrders, updateOrderOtp ,verifyOrder } from "../controllers/Order.controller.js";

const router = express.Router();

router.post("/", createOrders);
router.get("/", getOrders);
router.post("/verify", verifyOrder);
router.post("/updateotp", updateOrderOtp);

export default router;