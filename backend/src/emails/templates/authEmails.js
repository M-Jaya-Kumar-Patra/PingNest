import React from "react";

import Divider from "../components/Divider.js";
import InfoCard from "../components/InfoCard.js";
import OTPCard from "../components/OTPCard.js";
import PrimaryButton from "../components/PrimaryButton.js";
import SectionTitle from "../components/SectionTitle.js";
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
        margin: "0 0 16px",
      },
    },
    children,
  );

const link = (href, children) =>
  React.createElement(
    "a",
    {
      href,
      style: {
        color: colors.orange,
        textDecoration: "none",
      },
    },
    children,
  );

const feature = (children, key) =>
  React.createElement(
    "p",
    {
      key,
      style: {
        color: colors.body,
        fontSize: "14px",
        lineHeight: "22px",
        margin: "0 0 8px",
      },
    },
    `- ${children}`,
  );

export const WelcomeEmail = ({
  name,
  dashboardUrl,
  docsUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Welcome to PingNest",
      preview: "Your verified developer observability workspace is ready.",
      websiteUrl,
      supportEmail,
    },
    [
      text(`Hi ${name}, your email is verified and your PingNest workspace is ready.`, "intro"),
      React.createElement(SectionTitle, { key: "title" }, "Start monitoring with confidence"),
      text("PingNest helps you track requests, latency, errors, incidents, uptime, and health scores from one focused dashboard.", "summary"),
      React.createElement(
        InfoCard,
        { key: "features", title: "What you can do next" },
        [
          feature("Create projects and generate secure API keys.", "projects"),
          feature("Install the SDK and stream telemetry in minutes.", "sdk"),
          feature("Review dashboards, incidents, and uptime history.", "monitoring"),
        ],
      ),
      React.createElement(PrimaryButton, { key: "dashboard", href: dashboardUrl }, "Open Dashboard"),
      React.createElement(PrimaryButton, { key: "docs", href: docsUrl }, "Read Documentation"),
      text(["SDK installation guide: ", link(docsUrl, docsUrl)], "sdkLink"),
    ],
  );

export const VerificationOtpEmail = ({
  name,
  otp,
  expiresIn,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Verify your email",
      preview: "Use this OTP to activate your PingNest account.",
      websiteUrl,
      supportEmail,
    },
    [
      text(`Hi ${name || "there"},`, "greeting"),
      text("Enter this verification code in PingNest to confirm your email address.", "message"),
      React.createElement(OTPCard, { key: "otp", otp }),
      text(`This code expires in ${expiresIn}.`, "expiry"),
      React.createElement(
        InfoCard,
        { key: "security", title: "Security notice" },
        "If you did not create a PingNest account, you can safely ignore this email. Never share this OTP with anyone.",
      ),
    ],
  );

export const ForgotPasswordOtpEmail = ({
  otp,
  expiresIn,
  resetUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Reset your password",
      preview: "Use this OTP to create a new PingNest password.",
      websiteUrl,
      supportEmail,
    },
    [
      text("We received a request to reset your PingNest password.", "intro"),
      React.createElement(OTPCard, { key: "otp", otp }),
      React.createElement(PrimaryButton, { key: "button", href: resetUrl }, "Reset Password"),
      text(["Button not working? Open this secure reset link: ", link(resetUrl, resetUrl)], "fallback"),
      text(`This password reset code expires in ${expiresIn}.`, "expiry"),
      React.createElement(
        InfoCard,
        { key: "warning", title: "Security warning" },
        "If you did not request a password reset, ignore this email and keep your current password.",
      ),
    ],
  );

export const PasswordChangedEmail = ({
  changedAt,
  loginUrl,
  websiteUrl,
  supportEmail,
}) =>
  React.createElement(
    EmailLayout,
    {
      title: "Password changed",
      preview: "Your PingNest password was changed successfully.",
      websiteUrl,
      supportEmail,
    },
    [
      text("Your PingNest account password was changed successfully.", "intro"),
      React.createElement(
        InfoCard,
        { key: "details", title: "Change details" },
        [
          text(`Time of change: ${changedAt}`, "time"),
          text("All active sessions were invalidated where applicable.", "sessions"),
        ],
      ),
      React.createElement(Divider, { key: "divider" }),
      text("If you did not perform this action, reset your password immediately and contact support.", "notice"),
      React.createElement(PrimaryButton, { key: "button", href: loginUrl }, "Go to Login"),
    ],
  );
