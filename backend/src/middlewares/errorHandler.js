import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || "Server Error"
    });
};

export default errorHandler;