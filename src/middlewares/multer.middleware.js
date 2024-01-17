// we are going to use multer as middleware i.e where ever we want to use fileupload we use this multer there
// multer is nodejs middleware to upload files to server.
// Nodejs does not have default features for file upload so we use multer.
//here we are uploading file to the server using three step process.
//First we will get the file from frontend and after that using multer we will store the file on server and after that we will upload the file to cloud.
//we can also do it in 2 steps i.e directly uploading the file to cloud. but following 3 step process is better

import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp') //here we should give the path in which our file should be stored before it is uploaded to cloud

    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname) // here we can select the filename that we want to our file
    }
  })
  
export const upload = multer({ storage: storage })
//after the file is uploaded to the cloud we should remove the file from server 

  