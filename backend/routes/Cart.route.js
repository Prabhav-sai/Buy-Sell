import express from 'express';
import { getCart, addItemToCart, removeItemFromCart } from '../controllers/Cart.controller.js';

const router = express.Router();

router.get('/', getCart);
router.post('/', addItemToCart);
router.delete('/:itemId', removeItemFromCart);

export default router;