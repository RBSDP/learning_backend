import {asyncHandler} from "../utils/asyncHandler.js";

import {ApiError} from "../utils/ApiError.js"

import {User} from "../models/user.model.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"


import { ApiResponse } from "../utils/ApiResponse.js";






const registerUser = asyncHandler(async (req,res) => {

    //get users details form frontend
    //validation (check all the details are correct like are feilds are empty and wheather the mail is correcr)
    //check if user already exist (simple way to check by email or username )
    //check for images and check for avatar
    //if images are available upload then to cloudinary
    //check weather the image or avatar is uploaded to cloudinary
    //create user object - create entry in db
    //remove password and refesh token feild from responce
    //check weather user is created or not 
    //return res

    const {fullName,email,userName,password} = req.body //got user details from frontend
    // now we wil do validation
    // if (fullName === ""){
    //     throw new ApiError(400,"fullname is required")

    // }

    // we can do the same with some method in js 

    if (
        [fullName,email,userName,password].some((feilds)=>feilds?.trim() === "")
    ){
        throw new ApiError(400,"all feilds are nessarory")
    }
    

    // now we are going to check weather the user actually exists or not

    const existedUser = User.findOne({
        $or:[{ email },{ userName }]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username alreadt exists")
    }


    // checking the images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLoccalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is requied")
    }

    // upload the images to clodinary


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLoccalPath)


    if(!avatar){
        throw new ApiError(400,"Avatar file is requied")
    }

    // entry in database

    const user = await User.create({fullName,avatar : avatar.url,coverImage : coverImage?.url || "",email,password,userName:userName.toLowercase})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"soemthing went wrong while regestring the user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser,"user regestried succesfully"))
    
    // res.status(200).json({
    //     message : "ok"
    // })
})


export {registerUser}