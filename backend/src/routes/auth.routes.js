import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login, refreshAccessToken, logout } from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { currentUser } from "../controllers/auth.controller.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many authentication attempts. Please try again later.",
  },
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many refresh attempts. Please login again.",
  },
});

router.post( "/register", authLimiter, validateRequest(registerSchema), register );
router.post( "/login", authLimiter, validateRequest(loginSchema), login );

router.get("/me", verifyJWT, currentUser);

router.post("/refresh-token", refreshLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;
