import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateTokens from "../utils/generateTokens.js";
import generateOtp from "../utils/generateOtp.js";
import { sendOtpEmail } from "./mail.service.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const otp = generateOtp();

  // await sendOtpEmail(
  //   email,
  //   otp
  // );

  const user = await User.create({
    name,
    email,
    password,

    // verificationOtp:
    //   otp,

    verificationOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken -verificationOtp",
  );

  return safeUser;
};

// login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // if (!user.isVerified) {
  // throw new ApiError(
  //   403,
  //   "Please verify your email first"
  // );
  // }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const tokens = await generateTokens(user);

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return {
    user: safeUser,
    ...tokens,
  };
};

// get current user

export const getCurrentUser = async (userId) => {
  return await User.findById(userId).select("-password -refreshToken");
};

// logout service

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

export const resendVerificationOtp = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Email already verified");
  }

  const otp = generateOtp();

  user.verificationOtp = otp;

  user.verificationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  await sendOtpEmail(email, otp);

  return true;
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = generateOtp();

  user.passwordResetOtp = otp;

  user.passwordResetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  await sendOtpEmail(email, otp);

  return true;
};

export const resetPassword = async (email, otp, password) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.passwordResetOtp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (user.passwordResetOtpExpiresAt < new Date()) {
    throw new ApiError(400, "OTP expired");
  }

  user.password = password;

  user.passwordResetOtp = null;

  user.passwordResetOtpExpiresAt = null;

  await user.save();

  return true;
};

export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findById(userId);

  const isValid = await user.comparePassword(currentPassword);

  if (!isValid) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword;

  user.refreshToken = null;

  await user.save();

  return true;
};

export const deleteUserAccount = async (userId, password) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw new ApiError(400, "Invalid password");
  }

  const projects = await Project.find({
    owner: userId,
  }).select("_id");

  const projectIds = projects.map((project) => project._id);

  await Telemetry.deleteMany({
    project: {
      $in: projectIds,
    },
  });

  await Project.deleteMany({
    owner: userId,
  });

  await User.findByIdAndDelete(userId);

  return true;
};
