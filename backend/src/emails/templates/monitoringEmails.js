import React from "react";

import InfoCard from "../components/InfoCard.js";
import PrimaryButton from "../components/PrimaryButton.js";
import { colors } from "../components/emailStyles.js";
import EmailLayout from "../layouts/EmailLayout.js";

const text = (children, key) =>
  React.createElement(
    "p",
    {
      key,
      style: {
        color: colors.body,
        fontSize: "15px",
        lineHeight: "24px",
        margin: "0 0 10px",
      },
    },
    children,
  );

const badge = (severity) =>
  React.createElement(
    "span",
    {
      style: {
        backgroundColor: "rgba(248, 113, 113, 0.14)",
        border: "1px solid rgba(248, 113, 113, 0.45)",
        borderRadius: "999px",
        color: colors.danger,
        display: "inline-block",
        fontSize: "12px",
        fontWeight: "700",
        lineHeight: "16px",
        padding: "6px 10px",
        textTransform: "uppercase",
      },
    },
    severity || "critical",
  );

const formatFallbackTime = () =>
  `${new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  })} IST`;

const MonitoringEmail = ({
  title,
  preview,
  severity,
  projectName,
  serviceName,
  incidentTime,
  status,
  responseTime,
  message,
  dashboardUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title,
      preview,
      websiteUrl,
      supportEmail,
    },
    [
      React.createElement(
        "div",
        {
          key: "badge",
          style: {
            margin: "0 0 18px",
          },
        },
        badge(severity),
      ),
      React.createElement(
        InfoCard,
        { key: "details", title: "Incident details" },
        [
          text(`Project: ${projectName || "Not provided"}`, "project"),
          text(`Service: ${serviceName || "Not provided"}`, "service"),
          text(`Incident time: ${incidentTime || formatFallbackTime()}`, "time"),
          text(`Current status: ${status || "Investigating"}`, "status"),
          text(`Response time: ${responseTime || "Not available"}`, "responseTime"),
          message && text(`Details: ${message}`, "message"),
        ],
      ),
      dashboardUrl &&
        React.createElement(PrimaryButton, { key: "button", href: dashboardUrl }, "Open Dashboard"),
    ],
  );

export const IncidentAlertEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "Incident alert",
    preview: "PingNest detected a new incident.",
  });

export const ServiceDownEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "Service down",
    preview: "A monitored service is currently down.",
    status: props.status || "Down",
  });

export const ServiceRestoredEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "Service restored",
    preview: "A monitored service has recovered.",
    severity: props.severity || "resolved",
    status: props.status || "Restored",
  });

export const HighErrorRateEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "High error rate",
    preview: "PingNest detected elevated error volume.",
    severity: props.severity || "warning",
  });

export const HighResponseTimeEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "High response time",
    preview: "PingNest detected slower than expected responses.",
    severity: props.severity || "warning",
  });

export const HealthScoreWarningEmail = (props) =>
  React.createElement(MonitoringEmail, {
    ...props,
    title: "Health score warning",
    preview: "A project health score needs attention.",
    severity: props.severity || "warning",
  });
