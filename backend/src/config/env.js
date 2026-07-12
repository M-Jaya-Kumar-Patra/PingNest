import dotenv from "dotenv/config";

export const env = {
  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGODB_URI,    

  jwtSecret: process.env.JWT_SECRET,    

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  nodeEnv: process.env.NODE_ENV || "development",
};