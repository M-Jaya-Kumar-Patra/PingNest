// src/jobs/uptimeMonitor.job.js

import cron from "node-cron";

import {
  runUptimeChecks,
} from "../services/uptimeChecker.service.js";

export const startUptimeMonitorJob =
  () => {
    cron.schedule(
      "* * * * *",
      async () => {
        console.log(
          "[UPTIME] Running checks..."
        );

        await runUptimeChecks();
      }
    );

    console.log(
      "[UPTIME] Cron started"
    );
  };