import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.service.js";
import {
  accessCookieOptions,
  clearCookieOptions,
  refreshCookieOptions,
} from "../constants/cookieOptions.js";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
import hashToken from "../utils/hashToken.js";

const sessionExpiredMessage = "Session expired. Please login again.";

const setAuthCookies = (res, accessToken, refreshToken) =>
  res
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions);

const clearAuthCookies = (res) =>
  res
    .clearCookie("accessToken", clearCookieOptions)
    .clearCookie("refreshToken", clearCookieOptions);

const clearStoredRefreshToken = async (token) => {
  const decoded = jwt.decode(token);

  if (decoded?.id) {
    await logoutUser(decoded.id);
  }
};

// register controller
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.validatedData);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});





//login controller
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedData;

  const result = await loginUser(email, password);

  return setAuthCookies(res, result.accessToken, result.refreshToken)
    .status(200)
    .json(new ApiResponse(200, result.user, "Login successful"));
});


// current user controller
export const currentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched"));
});


//refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    clearAuthCookies(res);
    throw new ApiError(401, sessionExpiredMessage);
  }

  let decoded;

  try {
    decoded = jwt.verify(incomingRefreshToken, env.jwtRefreshSecret);
  } catch (error) {
    clearAuthCookies(res);

    if (error.name === "TokenExpiredError") {
      await clearStoredRefreshToken(incomingRefreshToken);
    }

    throw new ApiError(401, sessionExpiredMessage);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    clearAuthCookies(res);
    throw new ApiError(401, sessionExpiredMessage);
  }

  const incomingRefreshTokenHash = hashToken(incomingRefreshToken);

  if (user.refreshToken !== incomingRefreshTokenHash) {
    await logoutUser(user._id);
    clearAuthCookies(res);
    throw new ApiError(401, sessionExpiredMessage);
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return setAuthCookies(res, accessToken, refreshToken)
    .status(200)
    .json(new ApiResponse(200, null, "Access token refreshed"));
});

const getLogoutUserFromRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
    const refreshTokenHash = hashToken(refreshToken);

    return await User.findOne({
      _id: decoded.id,
      refreshToken: refreshTokenHash,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = jwt.decode(refreshToken);

      if (decoded?.id) {
        await logoutUser(decoded.id);
      }
    }

    return null;
  }
};

const getLogoutUserFromAccessToken = async (accessToken) => {
  if (!accessToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(accessToken, env.jwtAccessSecret);

    return await User.findById(decoded.id);
  } catch {
    return null;
  }
};

// logout controller
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const accessToken = req.cookies?.accessToken;

  const user =
    (await getLogoutUserFromRefreshToken(refreshToken)) ||
    (await getLogoutUserFromAccessToken(accessToken));

  if (user?._id) {
    await logoutUser(user._id);
  }

  return clearAuthCookies(res)
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
