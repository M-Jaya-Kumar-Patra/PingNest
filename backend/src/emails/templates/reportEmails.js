import React from "react";

import InfoCard from "../components/InfoCard.js";
import PrimaryButton from "../components/PrimaryButton.js";
import SectionTitle from "../components/SectionTitle.js";
import StatCard from "../components/StatCard.js";
import { colors } from "../components/emailStyles.js";
import EmailLayout from "../layouts/EmailLayout.js";

const ReportEmail = ({
  title,
  preview,
  projectName,
  summary,
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
        InfoCard,
        { key: "summary", title: projectName || "Summary" },
        summary || "Your PingNest monitoring summary is ready.",
      ),
      dashboardUrl &&
        React.createElement(PrimaryButton, { key: "button", href: dashboardUrl }, "View Report"),
    ],
  );

export const DailySummaryEmail = (props) =>
  React.createElement(ReportEmail, {
    ...props,
    title: "Daily summary",
    preview: "Your daily PingNest monitoring summary.",
  });

export const WeeklySummaryEmail = (props) =>
  React.createElement(ReportEmail, {
    ...props,
    title: "Weekly summary",
    preview: "Your weekly PingNest monitoring summary.",
  });

export const MonthlyReportEmail = ({
  projectName,
  totalRequests,
  successRate,
  errorRate,
  averageResponseTime,
  healthScore,
  topEndpoint,
  dashboardUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Monthly report",
      preview: "Your monthly PingNest analytics report is ready.",
      websiteUrl,
      supportEmail,
    },
    [
      React.createElement(SectionTitle, { key: "title" }, projectName || "Workspace analytics"),
      React.createElement(
        "p",
        {
          key: "intro",
          style: {
            color: colors.body,
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 18px",
          },
        },
        "Here is a quick look at your monitoring performance this month.",
      ),
      React.createElement(
        "table",
        {
          key: "stats1",
          width: "100%",
          cellPadding: "0",
          cellSpacing: "0",
          role: "presentation",
        },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            [
              React.createElement(StatCard, {
                key: "requests",
                label: "Total Requests",
                value: totalRequests || "0",
              }),
              React.createElement(StatCard, {
                key: "success",
                label: "Success Rate",
                value: successRate || "0%",
              }),
            ],
          ),
        ),
      ),
      React.createElement(
        "table",
        {
          key: "stats2",
          width: "100%",
          cellPadding: "0",
          cellSpacing: "0",
          role: "presentation",
        },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            [
              React.createElement(StatCard, {
                key: "errors",
                label: "Error Rate",
                value: errorRate || "0%",
              }),
              React.createElement(StatCard, {
                key: "response",
                label: "Average Response Time",
                value: averageResponseTime || "0 ms",
              }),
            ],
          ),
        ),
      ),
      React.createElement(
        "table",
        {
          key: "stats3",
          width: "100%",
          cellPadding: "0",
          cellSpacing: "0",
          role: "presentation",
        },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            [
              React.createElement(StatCard, {
                key: "health",
                label: "Health Score",
                value: healthScore || "0",
              }),
              React.createElement(StatCard, {
                key: "endpoint",
                label: "Top Endpoint",
                value: topEndpoint || "Not available",
              }),
            ],
          ),
        ),
      ),
      dashboardUrl &&
        React.createElement(PrimaryButton, { key: "button", href: dashboardUrl }, "View Dashboard"),
    ],
  );
