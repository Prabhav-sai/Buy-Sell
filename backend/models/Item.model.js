import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true , trim: true },
    price: { type: Number, required: true , min : 0},
    description: { type: String, required: true },
    category: { type: String, required: true },
    // stock: { type: Number, required: true },
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    imageUrl: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
} , {timestamps: true}
);

const Item = mongoose.model("Item", itemSchema);

export default Item;