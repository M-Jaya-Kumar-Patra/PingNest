import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ingestTelemetry } from "../services/telemetry.service.js";

export const ingestTelemetryController = asyncHandler(async (req, res) => {
  await ingestTelemetry(req.validatedData);

  return res.status(201).json(new ApiResponse(201, null, "Telemetry received"));
});
