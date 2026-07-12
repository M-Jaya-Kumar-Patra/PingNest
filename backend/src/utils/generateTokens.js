import hashToken from "./hashToken.js";

const generateTokens = async (user) => {
  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  user.refreshToken = hashToken(refreshToken);

  await user.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshToken,
  };
};

export default generateTokens;
