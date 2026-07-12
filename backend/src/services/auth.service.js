import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateTokens from "../utils/generateTokens.js";


// register user
export const registerUser = async (userData) => {

  console.log("Service reached");

  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  console.log("Checked existing user");

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already registered"
    );
  }

  console.log("Creating user");

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log("User created");

  return await User.findById(user._id)
    .select("-password -refreshToken");
};



// login user
export const loginUser = async (email, password) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const tokens = await generateTokens(user);

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  return {
    user: safeUser,
    ...tokens,
  };
};



// get current user

export const getCurrentUser = async (userId) => {
    return await User.findById(userId).select("-password -refreshToken");
}


// logout service

export const logoutUser = async(userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
}



