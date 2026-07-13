import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { forgotPassword, logoutUser, registerUser, resetPassword, changeUserPassword, deleteUserAccount } from "../services/auth.service.js";
import {
  accessCookieOptions,
  refreshCookieOptions,
  cookieOptions,
} from "../constants/cookieOptions.js";
import { loginUser } from "../services/auth.service.js";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
import {resendVerificationOtp} from "../services/auth.service.js";




// register controller
export const register =
  asyncHandler(
    async (req, res) => {


      const user =
        await registerUser(
          req.validatedData
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            user,
            "User registered successfully"
          )
        );
    }
  );

//login controller
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedData;

  const result = await loginUser(email, password);

  return res
    .cookie("accessToken", result.accessToken, accessCookieOptions)
    .cookie("refreshToken", result.refreshToken, refreshCookieOptions)
    .status(200)
    .json(new ApiResponse(200, result.user, "Login successful"));
});

// current user controller
export const currentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched"));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Email already verified");
  }

  if (user.verificationOtp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (user.verificationOtpExpiresAt < new Date()) {
    throw new ApiError(400, "OTP expired");
  }

  user.isVerified = true;

  user.verificationOtp = null;

  user.verificationOtpExpiresAt = null;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));
});

//refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  
  const incommingRefreshToken = req.cookies?.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  let decoded;

  try {
    decoded = jwt.verify(incommingRefreshToken, env.jwtRefreshSecret);
  } catch {
    throw new ApiError(401, "Refresh token expired");
  }
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (user.refreshToken !== incommingRefreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return res
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, "Access token refreshed"));
});

// logout controller
export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user._id);

  return res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});


export const resendOtp =
  asyncHandler(async (
    req,
    res
  ) => {

    const { email } =
      req.body;

    await resendVerificationOtp(
      email
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "OTP resent successfully"
        )
      );
  });

  export const forgotPasswordController =
  asyncHandler(async (
    req,
    res
  ) => {

    const { email } =
      req.body;

    await forgotPassword(
      email
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Password reset OTP sent"
        )
      );
  });

  export const resetPasswordController =
  asyncHandler(async (
    req,
    res
  ) => {

    const {
      email,
      otp,
      password,
    } = req.body;

    await resetPassword(
      email,
      otp,
      password
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Password reset successfully"
        )
      );
  });




export const changePassword =
  asyncHandler(async (req, res) => {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    await changeUserPassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password changed successfully"
      )
    );
  });

export const deleteAccount =
  asyncHandler(async (req, res) => {

    const { password } =
      req.body;

    await deleteUserAccount(
      req.user._id,
      password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Account deleted successfully"
      )
    );
  });