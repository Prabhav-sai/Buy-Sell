import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({ error: "No token , Authorization denied" });
    }

    const token = authorization.split(" ")[1];

    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);

        const user_id = await User.findById({ _id }).select('_id');
        console.log(_id);
        console.log(user_id);
        if (!user_id) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user_id; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "request is not authorized"});
    }
};