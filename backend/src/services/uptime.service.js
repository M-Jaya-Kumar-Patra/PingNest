import axios from "axios";
import mongoose from "mongoose";

import Project from "../models/project.model.js";
import UptimeMonitor from "../models/uptimeMonitor.model.js";
import UptimeLog from "../models/uptimeLog.model.js";

import ApiError from "../utils/ApiError.js";

const validateProjectOwnership = async (projectId, ownerId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: ownerId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const createMonitor = async (projectId, ownerId, payload) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await UptimeMonitor.create({
    ...payload,
    project: project._id,
  });
};

export const getMonitors = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await UptimeMonitor.find({
    project: project._id,
  }).sort({
    createdAt: -1,
  });
};

export const deleteMonitor = async (monitorId, ownerId) => {
  const monitor = await UptimeMonitor.findById(monitorId).populate("project");

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  if (monitor.project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await UptimeLog.deleteMany({
    monitor: monitor._id,
  });

  await monitor.deleteOne();

  return true;
};

export const getMonitorLogs = async (monitorId, ownerId) => {
  const monitor = await UptimeMonitor.findById(monitorId).populate("project");

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  if (monitor.project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  return await UptimeLog.find({
    monitor: monitor._id,
  })
    .sort({
      createdAt: -1,
    })
    .limit(100);
};

export const getUptimeSummary = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  const monitors = await UptimeMonitor.find({
    project: project._id,
  });

  const total = monitors.length;

  const online = monitors.filter((m) => m.status === "UP").length;

  const offline = monitors.filter((m) => m.status === "DOWN").length;

  const logs = await UptimeLog.find({
    monitor: {
      $in: monitors.map((m) => m._id),
    },
  });

  const totalChecks = logs.length;

  const successfulChecks = logs.filter((log) => log.status === "UP").length;

  const uptimePercentage =
    totalChecks === 0
      ? 0
      : Number(((successfulChecks / totalChecks) * 100).toFixed(2));

  const avgLatency =
    totalChecks === 0
      ? 0
      : Math.round(
          logs.reduce((sum, log) => sum + log.responseTime, 0) / totalChecks,
        );

  return {
    totalMonitors: total,
    onlineMonitors: online,
    offlineMonitors: offline,

    totalChecks,
    uptimePercentage,
    avgLatency,
  };
};

export const getMonitorStats = async (monitorId) => {
  const logs = await UptimeLog.find({
    monitor: monitorId,
  });

  const total = logs.length;

  const success = logs.filter((log) => log.status === "UP").length;

  const uptime = total === 0 ? 0 : ((success / total) * 100).toFixed(2);

  const avgLatency =
    total === 0
      ? 0
      : Math.round(
          logs.reduce((sum, log) => sum + log.responseTime, 0) / total,
        );

  return {
    totalChecks: total,
    uptime,
    avgLatency,
  };
};

export const getMonitorById = async (monitorId, ownerId) => {
  const monitor = await UptimeMonitor.findById(monitorId).populate("project");

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  if (monitor.project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  return monitor;
};

export const toggleMonitorStatus = async (monitorId, ownerId) => {
  const monitor = await UptimeMonitor.findById(monitorId).populate("project");

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  if (monitor.project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  monitor.isActive = !monitor.isActive;

  await monitor.save();

  return monitor;
};

export const updateMonitor = async (monitorId, ownerId, payload) => {
  const monitor = await UptimeMonitor.findById(monitorId).populate("project");

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  if (monitor.project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  Object.assign(monitor, payload);

  await monitor.save();

  return monitor;
};
