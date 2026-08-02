import React from "react";

import InfoCard from "../components/InfoCard.js";
import PrimaryButton from "../components/PrimaryButton.js";
import { colors } from "../components/emailStyles.js";
import EmailLayout from "../layouts/EmailLayout.js";

const row = (label, value, key) =>
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
    [
      React.createElement(
        "strong",
        {
          key: "label",
          style: {
            color: colors.white,
          },
        },
        `${label}: `,
      ),
      value,
    ],
  );

export const ProjectCreatedEmail = ({
  projectName,
  apiKey,
  installCommand,
  docsUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Project created",
      preview: `${projectName} is ready to receive telemetry.`,
      websiteUrl,
      supportEmail,
    },
    [
      React.createElement(
        InfoCard,
        { key: "project", title: "Project details" },
        [
          row("Project", projectName, "project"),
          row("API key", apiKey, "key"),
          row("SDK install", installCommand, "install"),
        ],
      ),
      React.createElement(PrimaryButton, { key: "button", href: docsUrl }, "View Documentation"),
    ],
  );

export const ApiKeyRegeneratedEmail = ({
  projectName,
  regeneratedAt,
  dashboardUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "API key regenerated",
      preview: `The previous API key for ${projectName} is no longer valid.`,
      websiteUrl,
      supportEmail,
    },
    [
      React.createElement(
        InfoCard,
        { key: "security", title: "Security update" },
        [
          row("Project", projectName, "project"),
          row("Time", regeneratedAt, "time"),
          row("Warning", "Your previous API key has been revoked. Update your running services with the new key immediately.", "warning"),
        ],
      ),
      React.createElement(PrimaryButton, { key: "button", href: dashboardUrl }, "Open Dashboard"),
    ],
  );
