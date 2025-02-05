import User from "../models/User.model.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user_id); 
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user_id, req.body, { new: true , runValidators: true });
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};