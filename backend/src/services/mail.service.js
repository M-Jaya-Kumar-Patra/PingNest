import { render } from "@react-email/render";
import { resend } from "../config/resend.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

import {
  ForgotPasswordOtpEmail,
  PasswordChangedEmail,
  VerificationOtpEmail,
  WelcomeEmail,
} from "../emails/templates/authEmails.js";
import {
  ApiKeyRegeneratedEmail,
  ProjectCreatedEmail,
} from "../emails/templates/projectEmails.js";
import {
  HealthScoreWarningEmail,
  HighErrorRateEmail,
  HighResponseTimeEmail,
  IncidentAlertEmail,
  ServiceDownEmail,
  ServiceRestoredEmail,
} from "../emails/templates/monitoringEmails.js";
import {
  DailySummaryEmail,
  MonthlyReportEmail,
  WeeklySummaryEmail,
} from "../emails/templates/reportEmails.js";

const websiteUrl = env.frontendUrl;
const dashboardUrl = `${websiteUrl}/dashboard`;
const docsUrl = `${websiteUrl}/docs`;
const loginUrl = `${websiteUrl}/login`;
const supportEmail = env.supportEmail;
const emailTimeZone = "Asia/Kolkata";

const formatDateTime = (date = new Date()) =>
  date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: emailTimeZone,
    timeZoneName: "short",
  });

const sendEmail = async ({ to, subject, template }) => {
  try {
    if (!env.resendApiKey || !env.emailFrom) {
      logger.warn("Email skipped. RESEND_API_KEY or EMAIL_FROM is missing.");

      return null;
    }

    const html = await render(template);

    const { data, error } = await resend.emails.send({
      from: env.emailFrom,
      to,
      subject,
      html,
    });

    if (error) {
      logger.error("Email failed:", error.message);

      return null;
    }

    return data;
  } catch (error) {
    logger.error("Email failed:", error.message);

    return null;
  }
};

export const sendWelcomeEmail = (email, name) =>
  sendEmail({
    to: email,
    subject: "Welcome to PingNest",
    template: WelcomeEmail({
      name,
      dashboardUrl,
      docsUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendVerificationOtp = (email, otp, name) =>
  sendEmail({
    to: email,
    subject: "Verify your PingNest email",
    template: VerificationOtpEmail({
      name,
      otp,
      expiresIn: "10 minutes",
      websiteUrl,
      supportEmail,
    }),
  });

export const sendForgotPasswordOtp = (email, otp) =>
  sendEmail({
    to: email,
    subject: "Reset your PingNest password",
    template: ForgotPasswordOtpEmail({
      otp,
      expiresIn: "10 minutes",
      resetUrl: `${websiteUrl}/reset-password?email=${encodeURIComponent(email)}`,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendPasswordChangedEmail = (email) =>
  sendEmail({
    to: email,
    subject: "Your PingNest password was changed",
    template: PasswordChangedEmail({
      changedAt: formatDateTime(),
      loginUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendProjectCreatedEmail = (email, project) =>
  sendEmail({
    to: email,
    subject: "Your PingNest project is ready",
    template: ProjectCreatedEmail({
      projectName: project.name,
      apiKey: project.apiKey,
      installCommand: "npm install pingnest",
      docsUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendApiKeyRegeneratedEmail = (email, project) =>
  sendEmail({
    to: email,
    subject: "PingNest API key regenerated",
    template: ApiKeyRegeneratedEmail({
      projectName: project.name,
      regeneratedAt: formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendIncidentAlertEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest incident alert",
    template: IncidentAlertEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendServiceDownEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest service down",
    template: ServiceDownEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendServiceRestoredEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest service restored",
    template: ServiceRestoredEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendHighErrorRateEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest high error rate warning",
    template: HighErrorRateEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendHighResponseTimeEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest response time warning",
    template: HighResponseTimeEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendHealthScoreWarningEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest health score warning",
    template: HealthScoreWarningEmail({
      ...data,
      incidentTime: data.incidentTime || formatDateTime(),
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendDailySummaryEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest daily summary",
    template: DailySummaryEmail({
      ...data,
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendWeeklySummaryEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest weekly summary",
    template: WeeklySummaryEmail({
      ...data,
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendMonthlyReportEmail = (email, data = {}) =>
  sendEmail({
    to: email,
    subject: "PingNest monthly report",
    template: MonthlyReportEmail({
      ...data,
      dashboardUrl,
      websiteUrl,
      supportEmail,
    }),
  });

export const sendOtpEmail = sendVerificationOtp;
