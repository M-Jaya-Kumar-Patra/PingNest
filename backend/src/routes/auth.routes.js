import { Router } from "express";
import { register, login, refreshAccessToken, logout } from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { currentUser } from "../controllers/auth.controller.js";



const router = Router();

router.post( "/register", validateRequest(registerSchema), register );
router.post( "/login", validateRequest(loginSchema), login );

router.get("/me", verifyJWT, currentUser);

router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyJWT, logout);

export default router;