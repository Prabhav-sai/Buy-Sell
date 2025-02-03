import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true , alias:"_id"},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    otpHash: { type: String, required: true },
    status: { type: Boolean, required: true },
    timestamp: { type: Date , default: Date.now },
});

// orderSchema.pre('save', function(next) {
//     if (this.isModified('status')) {
//         this.timestamp = Date.now();
//     }
//     next();
// });

// think about how to handle date and time of transaction

const Order = mongoose.model("Order", orderSchema);

export default Order;