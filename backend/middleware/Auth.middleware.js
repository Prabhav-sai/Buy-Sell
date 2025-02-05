import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const verifyToken = async (req, res, next) => {
    // console.log(req);
    const { authorization } = req.headers;
    // console.log(authorization);

    if(!authorization){
        // console.log("heheh");
        return res.status(401).json({ error: "No token , Authorization denied" });
    }

    const token = authorization.split(" ")[1];

    // console.log(token);

    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);

        const user_id = await User.findById({ _id }).select('_id');
        console.log(_id);
        // console.log(user_id);
        if (!user_id) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user_id = user_id; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "request is not authorized"});
    }
};