// higher order function -- takes an function as parameter and returns another function
const asyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch((error)=>next(error))
    };
};

export default asyncHandler;