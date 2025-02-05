import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.user_id); 
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;