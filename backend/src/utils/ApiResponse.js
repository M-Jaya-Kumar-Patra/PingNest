class ApiResponse {
    constructor(
        statusCode = 200, 
        data, 
        message = "Sucess"
    ){
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;