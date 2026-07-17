import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createMonitor,
  getMonitors,
  deleteMonitor,
  getMonitorLogs,
  getUptimeSummary,
  getMonitorStats,
  getMonitorById,
  toggleMonitorStatus,
  updateMonitor,
} from "../services/uptime.service.js";

export const createMonitorController = asyncHandler(async (req, res) => {
  const monitor = await createMonitor(
    req.params.projectId,
    req.user._id,
    req.body,
  );

  return res.status(201).json(new ApiResponse(201, monitor, "Monitor created"));
});

export const getMonitorsController = asyncHandler(async (req, res) => {
  const monitors = await getMonitors(req.params.projectId, req.user._id);

  return res.json(new ApiResponse(200, monitors, "Monitors fetched"));
});

export const deleteMonitorController = asyncHandler(async (req, res) => {
  await deleteMonitor(req.params.monitorId, req.user._id);

  return res.json(new ApiResponse(200, null, "Monitor deleted"));
});

export const getMonitorLogsController = asyncHandler(async (req, res) => {
  const logs = await getMonitorLogs(req.params.monitorId, req.user._id);

  return res.json(new ApiResponse(200, logs, "Logs fetched"));
});

export const getUptimeSummaryController = asyncHandler(async (req, res) => {
  const summary = await getUptimeSummary(req.params.projectId, req.user._id);

  return res.json(new ApiResponse(200, summary, "Summary fetched"));
});

export const getMonitorStatsController = asyncHandler(async (req, res) => {
  const stats = await getMonitorStats(req.params.monitorId);

  return res.json(new ApiResponse(200, stats, "Stats fetched"));
});

export const getMonitorController = asyncHandler(async (req, res) => {
  const monitor = await getMonitorById(req.params.monitorId, req.user._id);

  return res.json(new ApiResponse(200, monitor, "Monitor fetched"));
});

export const toggleMonitorController = asyncHandler(async (req, res) => {
  const monitor = await toggleMonitorStatus(req.params.monitorId, req.user._id);

  return res.json(new ApiResponse(200, monitor, "Monitor updated"));
});

export const updateMonitorController = asyncHandler(async (req, res) => {
  const monitor = await updateMonitor(
    req.params.monitorId,
    req.user._id,
    req.body,
  );

  return res.json(new ApiResponse(200, monitor, "Monitor updated"));
});
