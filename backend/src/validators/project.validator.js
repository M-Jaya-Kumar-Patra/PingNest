import { z } from "zod";

const notificationPreferencesSchema =
  z.object({
    incidentAlerts: z.boolean().optional(),
    serviceDownAlerts: z.boolean().optional(),
    serviceRestoredAlerts: z.boolean().optional(),
    highResponseTimeAlerts: z.boolean().optional(),
    highErrorRateAlerts: z.boolean().optional(),
    healthScoreWarnings: z.boolean().optional(),
    dailySummary: z.boolean().optional(),
    weeklySummary: z.boolean().optional(),
    monthlyReport: z.boolean().optional(),
  });

export const createProjectSchema =
  z.object({
    name: z.string().min(2),
    description: z.string().optional(),
  });

export const updateProjectSchema =
  z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    notificationPreferences: notificationPreferencesSchema.optional(),
  });
