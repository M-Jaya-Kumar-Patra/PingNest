import dotenv from "dotenv/config";

const parseOrigins = (value) => {
  if (!value) {
    return ["http://localhost:3000"];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const parseDurationToMs = (value, fallbackMs) => {
  if (!value) {
    return fallbackMs;
  }

  if (typeof value === "number") {
    return value * 1000;
  }

  const match = String(value).trim().match(/^(\d+)(ms|s|m|h|d)?$/);

  if (!match) {
    return fallbackMs;
  }

  const amount = Number(match[1]);
  const unit = match[2] || "s";

  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
};

const jwtAccessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export const env = {
  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  nodeEnv: process.env.NODE_ENV || "development",

  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  corsOrigins: parseOrigins(
    process.env.CORS_ORIGIN || process.env.CLIENT_URL,
  ),

  jwtAccessExpiresIn,

  jwtRefreshExpiresIn,

  jwtAccessCookieMaxAgeMs: parseDurationToMs(
    jwtAccessExpiresIn,
    15 * 60 * 1000,
  ),

  jwtRefreshCookieMaxAgeMs: parseDurationToMs(
    jwtRefreshExpiresIn,
    7 * 24 * 60 * 60 * 1000,
  ),

  cookieSameSite:
    process.env.COOKIE_SAME_SITE ||
    (process.env.NODE_ENV === "production" ? "none" : "lax"),

  cookieSecure:
    process.env.COOKIE_SECURE !== undefined
      ? process.env.COOKIE_SECURE === "true"
      : process.env.NODE_ENV === "production",
};
