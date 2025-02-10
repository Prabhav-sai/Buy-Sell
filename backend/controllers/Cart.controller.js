import User from "../models/User.model.js";
import Item from "../models/Item.model.js";

export const getCart = async (req, res) => {
    try {
        let user = await User.findById(req.user_id)
          .populate({
            path: 'cart',
            select: 'name price description category seller imageUrl',
            populate: {
              path: 'seller',
              select: 'email firstName lastName'
            }
          });
    
        res.json(user.cart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


export const addItemToCart = async (req, res) => {
  // console.log(req.user_id);
    try {
      const { itemId } = req.body;
      // console.log(itemId);
        let user = await User.findById(req.user_id);
        const item = await Item.findById(itemId).populate('seller','_id');
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.seller._id.toString() === user._id.toString()) {
          return res.status(400).json({ message: "You cannot add your own item to the cart" });
        }
        user.cart.push(item);
        await user.save();
        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeItemFromCart = async (req, res) => {
    try {
        let user = await User.findById(req.user_id);
        const itemId = req.params.itemId;
    
        // Check if item exists in cart
        if (!user.cart.includes(itemId)) {
          return res.status(400).json({ error: 'Item not in cart' });
        }
    
        // Remove item
        user.cart = user.cart.filter(id => id.toString() !== itemId);
        await user.save();
    
        res.json({ message: 'Item removed from cart', cart: user.cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};