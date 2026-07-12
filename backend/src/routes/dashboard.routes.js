import { Router } from "express";

import { dashboardOverviewController } from "../controllers/dashboard.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/overview", dashboardOverviewController);

export default router;
