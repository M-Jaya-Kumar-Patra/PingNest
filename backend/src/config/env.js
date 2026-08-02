import dotenv from "dotenv/config";

export const env = {
  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGODB_URI,    

  jwtSecret: process.env.JWT_SECRET,    

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  nodeEnv: process.env.NODE_ENV || "development",

  resendApiKey: process.env.RESEND_API_KEY,

  emailFrom: process.env.EMAIL_FROM,

  frontendUrl:
    process.env.FRONTEND_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"),

  supportEmail: process.env.SUPPORT_EMAIL,
};
