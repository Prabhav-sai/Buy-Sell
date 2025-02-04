import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    image: { type: String, required: true },
} , {timestamps: true}
);

const Item = mongoose.model("Item", itemSchema);

export default Item;