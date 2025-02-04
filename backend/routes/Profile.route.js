import express from "express";
import User from "../models/user.model.js";
import { verifyToken } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.user); // req.user is set in the middleware
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;