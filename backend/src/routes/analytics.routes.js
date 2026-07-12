import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  dashboardSummaryController,
  errorDistributionController,
  healthScoreController,
  recentRequestsController,
  requestsTimelineController,
  slowestEndpointsController,
  topEndpointsController,
} from "../controllers/analytics.controller.js";

const router = Router();

// all analytics routes protected
router.use(verifyJWT);

router.get("/:projectId/summary", dashboardSummaryController);
router.get("/:projectId/recent-requests", recentRequestsController);
router.get("/:projectId/top-endpoints", topEndpointsController);
router.get("/:projectId/error-distribution", errorDistributionController);
router.get("/:projectId/requests-timeline", requestsTimelineController);
router.get("/:projectId/slowest-endpoints", slowestEndpointsController);
router.get("/:projectId/health-score", healthScoreController);

export default router;
