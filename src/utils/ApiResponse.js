class ApiResponse {
    constructor(starusCode,messaage="Success",data){
        this.statusCode =statusCode
        this.data = data
        this.message = this.message
        this.success = starusCode < 400

    }
}


export {ApiResponse}