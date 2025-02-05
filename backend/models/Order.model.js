import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true , alias:"_id"},
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    amount: { type: Number, required: true },
    otpHash: { type: String, required: true },
    completed_status: { type: Boolean, required: true , default: false},
} , {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;