import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /@iiit\.ac\.in$/ }, // Restrict to IIIT emails
    password: { type: String, required: true },
    age: { type: Number, required: true , min: 18},
    contactNumber: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // Cart items
    sellerReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], //seller reviews
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); // 10 is the number of rounds of salting
    next();
  });

const User = mongoose.model("User", userSchema);

export default User;