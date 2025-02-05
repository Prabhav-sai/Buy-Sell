import Item from "../models/Item.model.js";

// Create a new item
export const createItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const seller = req.user_id; // Get seller ID from authenticated user

    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      name,
      description,
      price,
      category,
      imageUrl,
      seller,
    });

    await newItem.save();
    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetItems = async (req, res) => {
    // console.log(req.user_id);
    try {

        const items = await Item.find().populate("seller", "email");
        // items = items.filter(item => item.seller !== req.user_id);
        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const GetItembyId = async (req, res) => {
    try {
        const item = await Item.findById(req.params.item_id).populate("seller", "email");
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
