import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`mongodb+srv://psiva6668:psiva6668@cluster0.cikwvyb.mongodb.net/${DB_NAME}`)
        console.log(` \n MongoDB connected || DB HOST : ${connectionInstance.connection.host}`)
        console.log("mongodn connect ")
    }catch (error){
        console.log("MongoDB connection failed",error)
        process.exit(1)
    }
}

// ${process.env.MONGODB_URI}



export default connectDB