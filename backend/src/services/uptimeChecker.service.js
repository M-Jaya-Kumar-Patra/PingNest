// src/services/uptimeChecker.service.js

import axios from "axios";

import UptimeMonitor from "../models/uptimeMonitor.model.js";
import UptimeLog from "../models/uptimeLog.model.js";
import Incident from "../models/incident.model.js";

import { createIncident, resolveIncident } from "./incident.service.js";
import { getIO } from "../sockets/socket.js";

export const checkMonitor = async (monitor) => {
  const startTime = Date.now();

  try {
    const response = await axios({
      method: monitor.method,
      url: monitor.url,
      timeout: 10000,
      validateStatus: () => true,
    });

    const responseTime = Date.now() - startTime;

    const status =
      response.status >= 200 && response.status < 400 ? "UP" : "DOWN";

    const failures = status === "DOWN" ? monitor.consecutiveFailures + 1 : 0;

    await UptimeLog.create({
      monitor: monitor._id,
      status,
      responseTime,
      statusCode: response.status,
    });

    const updatedMonitor = await UptimeMonitor.findByIdAndUpdate(
      monitor._id,
      {
        status,
        lastCheckedAt: new Date(),
        lastResponseTime: responseTime,
        consecutiveFailures: failures,
      },
      { new: true },
    );

    // Resolve incident if service recovered
    if (monitor.status === "DOWN" && status === "UP") {
      await resolveIncident(monitor._id);
    }

    // Create incident after 3 consecutive failures
    if (status === "DOWN" && failures >= 3) {
      const existing = await Incident.findOne({
        monitor: monitor._id,
        status: "OPEN",
      });

      if (!existing) {
        await createIncident({
          projectId: monitor.project,
          monitorId: monitor._id,
          title: `${monitor.name} is down`,
          description: `${monitor.url} returned failing responses.`,
          severity: "HIGH",
        });
      }
    }

    // Emit realtime update
    try {
      const io = getIO();

      io.to(monitor.project.toString()).emit("monitor:update", {
        monitorId: monitor._id,
        projectId: monitor.project,
        status,
        responseTime,
        statusCode: response.status,
        consecutiveFailures: failures,
        lastCheckedAt: new Date(),
      });
    } catch (socketError) {
      console.error("Socket emit failed:", socketError.message);
    }

    console.log(`[UPTIME] ${monitor.name} -> ${status} (${responseTime}ms)`);

    return updatedMonitor;
  } catch (error) {
    const responseTime = Date.now() - startTime;

    const failures = monitor.consecutiveFailures + 1;

    await UptimeLog.create({
      monitor: monitor._id,
      status: "DOWN",
      responseTime,
      errorMessage: error.message,
    });

    const updatedMonitor = await UptimeMonitor.findByIdAndUpdate(
      monitor._id,
      {
        status: "DOWN",
        lastCheckedAt: new Date(),
        lastResponseTime: responseTime,
        consecutiveFailures: failures,
      },
      { new: true },
    );

    if (failures >= 3) {
      const existing = await Incident.findOne({
        monitor: monitor._id,
        status: "OPEN",
      });

      if (!existing) {
        await createIncident({
          projectId: monitor.project,
          monitorId: monitor._id,
          title: `${monitor.name} is down`,
          description: error.message,
          severity: "CRITICAL",
        });
      }
    }

    // Emit realtime update
    try {
      const io = getIO();

      io.to(monitor.project.toString()).emit("monitor:update", {
        monitorId: monitor._id,
        projectId: monitor.project,
        status: "DOWN",
        responseTime,
        error: error.message,
        consecutiveFailures: failures,
        lastCheckedAt: new Date(),
      });
    } catch (socketError) {
      console.error("Socket emit failed:", socketError.message);
    }

    console.log(`[UPTIME] ${monitor.name} -> DOWN (${error.message})`);

    return updatedMonitor;
  }
};

export const runUptimeChecks = async () => {
  try {
    const monitors = await UptimeMonitor.find({
      isActive: true,
    });

    console.log(`[UPTIME] Running checks for ${monitors.length} monitors`);

    for (const monitor of monitors) {
      await checkMonitor(monitor);
    }
  } catch (error) {
    console.error("Uptime checker failed:", error.message);
  }
};
