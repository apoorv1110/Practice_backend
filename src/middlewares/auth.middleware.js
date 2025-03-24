import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT = asyncHandler(async (req, _ ,next) =>{ // many time out of req , res one is not used so you can replace it with _
    // humne req ko cookies ka access diya tha cookie parser add karke 
    // to hum uska use karke user laa sakte hai jise hame
    // logout karana hai
    
    try {
        const token = req.cookies?.accessToken || 
        req.header("Authorization")?.replace("Bearer", "")
    
        if(!token){
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select
        ("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401 , "Invalid Access token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(405 , error.message || "Invalid access token")
    }

})