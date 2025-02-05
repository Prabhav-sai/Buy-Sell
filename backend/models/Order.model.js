import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true , alias:"_id"},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    otpHash: { type: String, required: true },
    completed_status: { type: Boolean, required: true },
} , {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;