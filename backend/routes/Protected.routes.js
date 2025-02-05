import express from "express";
import { verifyToken } from "../middleware/Auth.middleware.js";
import profilerouter from "./Profile.route.js";
import itemrouter from "./Item.route.js";
import cartrouter from "./Cart.route.js";

const router = express.Router();

router.use(verifyToken);

router.use('/profile', profilerouter);
router.use('/items',itemrouter);
router.use('/cart',cartrouter);

export default router;