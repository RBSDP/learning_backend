import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"


// cloudinary.config({ 
//   cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

          
cloudinary.config({ 
  cloud_name: 'dmr82no43', 
  api_key: '969763338716576', 
  api_secret: 'BR8uqcSjHIo-T0RL3nWTMlGsneI' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        // file has been uploaded successfully
        fs.unlinkSync(localFilePath)
        // console.log("file is uploaded on cloudinary",response.url)
        return response
    } catch (err) {
        fs.unlinkSync(localFilePath)
        //remove the locally saved twmporary file as the upload operation got failed
        return null;
    }

}

export {uploadOnCloudinary}
// we are going to use multer as middleware i.e where ever we want to use fileupload we use this uploadCloudinary there