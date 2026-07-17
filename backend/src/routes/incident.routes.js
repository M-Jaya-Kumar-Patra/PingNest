import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getIncidentsController,
  getIncidentController,
  getIncidentSummaryController,
  getIncidentByIdController,
} from "../controllers/incident.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/project/:projectId", getIncidentsController);

router.get("/project/:projectId/summary", getIncidentSummaryController);

router.get("/detail/:id", getIncidentController);

router.get("/:incidentId", getIncidentByIdController);

export default router;
