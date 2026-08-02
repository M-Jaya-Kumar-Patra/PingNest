import Project from "../models/project.model.js";
import {
  getAverageResponseTime,
  getDashboardSummary,
  getHealthScore,
  getSuccessRate,
  getTopEndpoints,
  getTotalRequests,
} from "./analytics.service.js";
import {
  sendDailySummaryEmail,
  sendHealthScoreWarningEmail,
  sendHighErrorRateEmail,
  sendHighResponseTimeEmail,
  sendIncidentAlertEmail,
  sendMonthlyReportEmail,
  sendServiceDownEmail,
  sendServiceRestoredEmail,
  sendWeeklySummaryEmail,
} from "./mail.service.js";
import { logger } from "../utils/logger.js";

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const TWENTY_EIGHT_DAYS = 28 * ONE_DAY;

const THRESHOLDS = {
  errorRate: 5,
  responseTime: 1000,
  healthScore: 80,
};

const EMAIL_COOLDOWNS = {
  serviceDownAlerts: ONE_DAY,
  serviceRestoredAlerts: ONE_HOUR,
  highResponseTimeAlerts: ONE_HOUR,
  highErrorRateAlerts: ONE_HOUR,
  healthScoreWarnings: ONE_HOUR,
  dailySummary: ONE_DAY,
  weeklySummary: ONE_WEEK,
  monthlyReport: TWENTY_EIGHT_DAYS,
};

const STATE_FIELDS = {
  serviceDownAlerts: "serviceDownAlertSentAt",
  serviceRestoredAlerts: "serviceRestoredAlertSentAt",
  highResponseTimeAlerts: "highResponseTimeAlertSentAt",
  highErrorRateAlerts: "highErrorRateAlertSentAt",
  healthScoreWarnings: "healthScoreWarningSentAt",
  dailySummary: "dailySummarySentAt",
  weeklySummary: "weeklySummarySentAt",
  monthlyReport: "monthlyReportSentAt",
};

const loadProjectWithOwner = async (projectId) =>
  Project.findById(projectId).populate("owner", "email name");

const isCooledDown = (lastSentAt, cooldown) => {
  if (!lastSentAt) return true;

  return Date.now() - new Date(lastSentAt).getTime() >= cooldown;
};

const sendProjectNotification = async ({
  projectId,
  preferenceKey,
  sendEmail,
  data,
  cooldown = EMAIL_COOLDOWNS[preferenceKey],
}) => {
  try {
    const project = await loadProjectWithOwner(projectId);

    if (!project?.owner?.email) return null;

    if (project.notificationPreferences?.[preferenceKey] === false) {
      return null;
    }

    const stateField = STATE_FIELDS[preferenceKey];

    if (
      stateField &&
      cooldown &&
      !isCooledDown(project.notificationState?.[stateField], cooldown)
    ) {
      return null;
    }

    const result = await sendEmail(project.owner.email, {
      projectName: project.name,
      ...data,
    });

    if (stateField) {
      await Project.updateOne(
        { _id: project._id },
        {
          $set: {
            [`notificationState.${stateField}`]: new Date(),
          },
        },
      );
    }

    return result;
  } catch (error) {
    logger.error("Project notification failed:", error.message);

    return null;
  }
};

export const notifyIncidentCreated = async ({ projectId, monitor, incident }) => {
  const data = {
    serviceName: monitor?.name,
    severity: incident.severity,
    status: incident.status,
    incidentTime: incident.createdAt?.toLocaleString("en-US"),
    message: incident.description || incident.title,
  };

  await sendProjectNotification({
    projectId,
    preferenceKey: "incidentAlerts",
    sendEmail: sendIncidentAlertEmail,
    data,
    cooldown: null,
  });

  await sendProjectNotification({
    projectId,
    preferenceKey: "serviceDownAlerts",
    sendEmail: sendServiceDownEmail,
    data,
  });
};

export const notifyServiceRestored = ({ projectId, monitor, incident }) =>
  sendProjectNotification({
    projectId,
    preferenceKey: "serviceRestoredAlerts",
    sendEmail: sendServiceRestoredEmail,
    data: {
      serviceName: monitor?.name,
      severity: "resolved",
      status: "Restored",
      incidentTime: incident?.resolvedAt?.toLocaleString("en-US"),
      responseTime: monitor?.lastResponseTime
        ? `${monitor.lastResponseTime} ms`
        : undefined,
      message: incident?.title,
    },
  });

export const evaluateTelemetryNotifications = async (projectId) => {
  try {
    const project = await loadProjectWithOwner(projectId);

    if (!project?.owner?._id) return;

    const summary = await getDashboardSummary(project._id, project.owner._id);
    const healthScore = await getHealthScore(project._id, project.owner._id);

    if (summary.errorRate >= THRESHOLDS.errorRate) {
      await sendProjectNotification({
        projectId: project._id,
        preferenceKey: "highErrorRateAlerts",
        sendEmail: sendHighErrorRateEmail,
        data: {
          severity: "warning",
          status: "Warning",
          responseTime: `${Math.round(summary.averageResponseTime)} ms`,
          message: `Error rate is ${summary.errorRate.toFixed(1)}%, above the ${THRESHOLDS.errorRate}% threshold.`,
        },
      });
    }

    if (summary.averageResponseTime >= THRESHOLDS.responseTime) {
      await sendProjectNotification({
        projectId: project._id,
        preferenceKey: "highResponseTimeAlerts",
        sendEmail: sendHighResponseTimeEmail,
        data: {
          severity: "warning",
          status: "Warning",
          responseTime: `${Math.round(summary.averageResponseTime)} ms`,
          message: `Average response time is above the ${THRESHOLDS.responseTime} ms threshold.`,
        },
      });
    }

    if (healthScore <= THRESHOLDS.healthScore) {
      await sendProjectNotification({
        projectId: project._id,
        preferenceKey: "healthScoreWarnings",
        sendEmail: sendHealthScoreWarningEmail,
        data: {
          severity: "warning",
          status: "Warning",
          responseTime: `${Math.round(summary.averageResponseTime)} ms`,
          message: `Health score is ${healthScore}, below the ${THRESHOLDS.healthScore} threshold.`,
        },
      });
    }
  } catch (error) {
    logger.error("Telemetry notification evaluation failed:", error.message);
  }
};

const buildReportData = async (project) => {
  const [
    totalRequests,
    averageResponseTime,
    successRate,
    healthScore,
    topEndpoints,
  ] = await Promise.all([
    getTotalRequests(project._id),
    getAverageResponseTime(project._id),
    getSuccessRate(project._id),
    getHealthScore(project._id, project.owner._id),
    getTopEndpoints(project._id, project.owner._id),
  ]);

  const errorRate = 100 - successRate;
  const topEndpoint = topEndpoints[0]?._id || "Not available";
  const summary = [
    `Total requests: ${totalRequests}`,
    `Success rate: ${successRate.toFixed(1)}%`,
    `Error rate: ${errorRate.toFixed(1)}%`,
    `Average response time: ${Math.round(averageResponseTime)} ms`,
    `Health score: ${healthScore}`,
  ].join(" | ");

  return {
    projectName: project.name,
    summary,
    totalRequests,
    successRate: `${successRate.toFixed(1)}%`,
    errorRate: `${errorRate.toFixed(1)}%`,
    averageResponseTime: `${Math.round(averageResponseTime)} ms`,
    healthScore,
    topEndpoint,
  };
};

export const sendScheduledReports = async (preferenceKey) => {
  const emailByPreference = {
    dailySummary: sendDailySummaryEmail,
    weeklySummary: sendWeeklySummaryEmail,
    monthlyReport: sendMonthlyReportEmail,
  };

  const projects = await Project.find({
    status: "active",
    [`notificationPreferences.${preferenceKey}`]: { $ne: false },
  }).populate("owner", "email name");

  for (const project of projects) {
    try {
      const data = await buildReportData(project);

      await sendProjectNotification({
        projectId: project._id,
        preferenceKey,
        sendEmail: emailByPreference[preferenceKey],
        data,
      });
    } catch (error) {
      logger.error("Scheduled report failed:", error.message);
    }
  }
};
