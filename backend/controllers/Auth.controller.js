import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const createToken = (_id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET);
    return token;
};

export const register = async (req, res) => {
    const { firstName, lastName, email, password, age, contactNumber } = req.body;
    try{
        // check for existing user
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        // create new user
        user = new User({ firstName, lastName, email, password, age, contactNumber });
        await user.save();

        //create and return jsonwebtoken
        const token = createToken(user._id);
        return res.status(201).json({ token , user_details : { id: user._id, firstName, lastName, email, age, contactNumber } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const login =  async (req, res) => {
    const { email, password } = req.body;
    // console.log("login");
    try{
        // check for existing user
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "user not found" });
        }
        // validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //create and return jsonwebtoken
        const token = createToken(user._id);
        return res.status(200).json({ token , user_details : { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, age: user.age, contactNumber: user.contactNumber } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}