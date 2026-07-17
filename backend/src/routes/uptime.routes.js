import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createMonitorController,
  getMonitorsController,
  deleteMonitorController,
  getMonitorLogsController,
  getUptimeSummaryController,
  getMonitorStatsController,
  getMonitorController,
  toggleMonitorController,
  updateMonitorController,
} from "../controllers/uptime.controller.js";

const router = Router();

router.use(verifyJWT);
router.post("/:projectId", createMonitorController);
router.get("/:projectId", getMonitorsController);
router.get("/:projectId/summary", getUptimeSummaryController);
router.get("/logs/:monitorId", getMonitorLogsController);
router.delete("/:monitorId", deleteMonitorController);
router.get("/stats/:monitorId", getMonitorStatsController);
router.get("/monitor/:monitorId", getMonitorController);
router.patch("/toggle/:monitorId", toggleMonitorController);
router.patch("/:monitorId", updateMonitorController);

export default router;
