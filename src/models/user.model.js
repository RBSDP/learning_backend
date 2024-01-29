
import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';


import bcrypt from "bcrypt";

const userSchema = new Schema({

    userName : {
        type : String,
        required :true,
        unique : true,
        lowercase :true,
        trim : true,
        index : true // keep in mind that when ever you want the feild to be searched keep index : true in schema fro that feild

    },
    email : {
        type : String,
        required :true,
        unique : true,
        lowercase :true,
        trim : true,
    },

    fullName : {
        type:String,
        required :true,
        trim : true,
        index  :true
    },

    avatar : {
        type : String, 
        //cloudinary url
        required : true
    },
    coverImage : {
        type : String, 
        //cloudinary url
    },
    watchHistory : [
        {
            type : Schema.Types.objectId,
            ref: "Video"
        }
    ],

    password : {
        type: String,
        required : [true, "password is required"]
    },
    refreshToken : { 
        type : String
    }



},{timeStamps : true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName


    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    )
};

// REFRESH token consists of less data than access token

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    
    )
}

export const User = mongoose.model("User",userSchema) 