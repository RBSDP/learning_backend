import {asyncHandler} from "../utils/asyncHandler.js";

import {ApiError} from "../utils/ApiError.js"

import {User} from "../models/user.model.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"


import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessandRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500,"something went wrong while generating access and refersh token ")
        
    }
}



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

    //this below code is necessary but i commented it because some error, so learn about it more in future
    // if (
    //     [fullName, email, userName, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }
    

    // now we are going to check weather the user actually exists or not

    const existedUser = await User.findOne({
        $or:[{ userName },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username alreadt exists")
    }


    // checking the images
    const avatarLocalPath = req.files?.avatar[0]?.path;

    
    
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file path is requied")
    }

    // upload the images to clodinary


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        
        throw new ApiError(400,"Avatar file is requied")
    }

    // entry in database

    const user = await User.create({fullName,avatar : avatar.url,coverImage : coverImage?.url || "",email,password,userName})
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"soemthing went wrong while regestring the user")
    }

     return res.status(201).json(new ApiResponse(200, createdUser,"user regestried succesfully"))
    
    // return res.status(200).json({
    //     message : "ok"
    // })
})



const loginUser = asyncHandler(async(req,res) => {
    // get data form req body
    //check weather username or email
    //fing the user
    //password check
    //access and refresh token
    //send tokens in cookies

    const {email,userName,password} = req.body

    if(!userName || !email){
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or:[{userName},{email}]
    })

    if (!user){
        throw new ApiError(404, "user does not exist")

    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid){
        throw new ApiError(401, "invalid user credentials")

    }

    const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggesInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,{
                user:loggesInUser,accessToken,refreshToken
            },
            "User logged In Successfully"

        
        )
    )          



})

const logoutUser = asyncHandler(async(req,res) => {
    
   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },{
            // it sends new updated values withput refresh token in response
            new : true 
        } 
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200,{},"user logged out"))

})




export {registerUser,loginUser,logoutUser}


// access token is short lived, refresh token is long lived


// we store refresh token in database
