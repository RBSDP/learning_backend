class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        error = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors


        // avoid this below it is advanced code we can learn about it later 
        // if(stack){
        //     this.stack = stack
        // }else{
        //     Error.captureStackTrace(this,this.constructor)
        // }
    }
}


export {ApiError}