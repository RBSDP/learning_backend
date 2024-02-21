// const asyncHandler = (hadlerFunction) => async(req,res,next) =>{

//     try {
//         await hadleerFunction(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }

// }

// using promises
const asyncHandler = (requestHandler) => {
    return (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
     }
 }
 
 export {asyncHandler}