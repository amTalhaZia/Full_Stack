import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import  {ApiErrors}   from  '../utils/apiErrors.js'
// import  cookiparser from  'cookie-parser'
import  dotenv  from "dotenv"
import { User } from "../models/user.models.js"


dotenv.config()

const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
        
        console.log("token", token);
        
        if (!token) {
            throw new ApiErrors(401, "Not authorized, please login."); 
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decode", decode);
        
        const user = await User.findById(decode._id);
        
        if (!user) {
            throw new ApiErrors(401, "Not authorized, please login."); 
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyJwt:", error); // Log the error for debugging
        throw new ApiErrors(401, error.message); 
    }
});


export  {verifyJwt}