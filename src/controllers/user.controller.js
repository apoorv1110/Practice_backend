import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req , res)=>{
     
    // step 1 : get user details 
    const {fullname , email, username , password} = req.body
    //console.log("email" , email);

    // step2 : validate if all details are filled using array
    if([fullname, email,username , password].some((feild)=> 
    feild?.trim() === "")){
        throw new ApiError(400 , "All feilds are required")
    }

    // step 3: check if user already exist
    const existedUser = await User.findOne({
        $or: [ {email} , {username}]
    })
    if(existedUser){
        throw new ApiError(409 , "User with email or username exist")
    }
    
    // check for images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const CoverImageLocalPath = req.files?.coverimage[0]?.path
    let CoverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage)&&
req.files.coverImage.length>0){
    CoverImageLocalPath = req.files.coverImage[0].path
}
    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required")
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimage = await uploadOnCloudinary(CoverImageLocalPath)
    if(!avatar){
        throw new ApiError(400 , "Avatar file is required")
    }

    // crete user and make entry in database

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // check for user creation and remove password and refresh token feild
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering user")
    }

    // return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

} )


export {registerUser}

