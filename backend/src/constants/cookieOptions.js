import { env } from "../config/env.js";

export const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "strict",
};

export const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 10 * 1000,
};

export const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 20 * 1000,
};
