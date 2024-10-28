import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import  cookiparser from  'cookie-parser'
import  dotenv  from "dotenv"
import { User } from "../models/user.models.js"


dotenv.config()

const verifyJwt =  asyncHandler(async(req, res, next)=> {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "")

         if (!token) {
             throw new Error("Not authorized, please login.")
         }

        const decode = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )

        const user = await User.findById(decode._id)

        if (!user) {
            throw new Error("Not authorized, please login.")
        }

        req.user = user
        next()

    } catch (error) {
        throw  new ApiError(402, error.message, "authentication failed")
    }
})

export  {verifyJwt}