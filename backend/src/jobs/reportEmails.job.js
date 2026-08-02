import cron from "node-cron";

import { sendScheduledReports } from "../services/notification.service.js";

const runReportJob = async (reportType) => {
  try {
    await sendScheduledReports(reportType);
  } catch (error) {
    console.error("[REPORTS] Cron failed:", error.message);
  }
};

export const startReportEmailsJob = () => {
  cron.schedule("0 8 * * *", async () => {
    console.log("[REPORTS] Sending daily summaries...");

    await runReportJob("dailySummary");
  });

  cron.schedule("0 8 * * 1", async () => {
    console.log("[REPORTS] Sending weekly summaries...");

    await runReportJob("weeklySummary");
  });

  cron.schedule("0 8 1 * *", async () => {
    console.log("[REPORTS] Sending monthly reports...");

    await runReportJob("monthlyReport");
  });

  console.log("[REPORTS] Cron started");
};
