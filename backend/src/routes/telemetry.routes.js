import { Router } from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { telemetrySchema } from "../validators/telemetry.validator.js";
import { ingestTelemetryController } from "../controllers/telemetry.controller.js";

const router = Router();
router.post("/ingest", validateRequest(telemetrySchema), ingestTelemetryController);

export default router;
