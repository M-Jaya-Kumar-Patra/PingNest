import { env } from "../config/env.js"

export const cookieOptions = {
    httpOnly: true,
    secure: env.nodeEnv == "production",
    sameSite: "strict"
}

const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 50 * 1000,
};