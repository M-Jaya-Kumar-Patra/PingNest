import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { logoutUser, registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../constants/cookieOptions.js";
import { loginUser } from "../services/auth.service.js";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";




// register controller
export const register = asyncHandler(async(req,res)=>{

    console.log("Register controller reached");
   const user = await registerUser(req.validatedData);

   return res.status(201).json(
     new ApiResponse(
       201,
       user,
       "User registered successfully"
     )
   );
});





//login controller
export const login = asyncHandler(async(req,res)=>{

   const { email,password } = req.validatedData;

   const result = await loginUser( email, password );

   return res.cookie(
       "accessToken",
       result.accessToken,
       cookieOptions
     )
     .cookie(
       "refreshToken",
       result.refreshToken,
       cookieOptions
     )
     .status(200)
     .json(
       new ApiResponse(
         200,
         result.user,
         "Login successful"
       )
     );
});


// current user controller
export const currentUser = asyncHandler(async(req, res)=>{
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user fetched")
    );
})


//refresh access token
export const refreshAccessToken = asyncHandler(async(req, res) => {
    console.log(
      "REFRESH ENDPOINT HIT"
    );
    const incommingRefreshToken = req.cookies?.refreshToken;

    if(!incommingRefreshToken){
        throw new ApiError(401, "Refresh token missing");
    }

    let decoded;

try {

  decoded = jwt.verify(
    incommingRefreshToken,
    env.jwtRefreshSecret
  );

} catch {

  throw new ApiError(
    401,
    "Refresh token expired"
  );

}
    const user = await User.findById(decoded.id);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    if(user.refreshToken !== incommingRefreshToken){
        throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(200)
    .json(
        new ApiResponse(200, null, "Access token refreshed")
    )
});


// logout controller
export const logout = asyncHandler(async(req, res)=>{
    await logoutUser(req.user._id);

    return res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(200)
    .json(
        new ApiResponse(200, null, "Logged out successfully")
    );
})