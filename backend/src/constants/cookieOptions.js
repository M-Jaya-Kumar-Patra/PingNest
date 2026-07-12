import { env } from "../config/env.js";

export const cookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: env.cookieSameSite,
  secure: env.cookieSecure,
};

export const accessCookieOptions = {
  ...cookieOptions,
  maxAge: env.jwtAccessCookieMaxAgeMs,
};

export const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: env.jwtRefreshCookieMaxAgeMs,
};

export const clearCookieOptions = cookieOptions;
