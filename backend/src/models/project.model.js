import mongoose from "mongoose";

const notificationPreferencesSchema = new mongoose.Schema(
  {
    incidentAlerts: {
      type: Boolean,
      default: true,
    },
    serviceDownAlerts: {
      type: Boolean,
      default: true,
    },
    serviceRestoredAlerts: {
      type: Boolean,
      default: true,
    },
    highResponseTimeAlerts: {
      type: Boolean,
      default: true,
    },
    highErrorRateAlerts: {
      type: Boolean,
      default: true,
    },
    healthScoreWarnings: {
      type: Boolean,
      default: true,
    },
    dailySummary: {
      type: Boolean,
      default: false,
    },
    weeklySummary: {
      type: Boolean,
      default: true,
    },
    monthlyReport: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const notificationStateSchema = new mongoose.Schema(
  {
    serviceDownAlertSentAt: Date,
    serviceRestoredAlertSentAt: Date,
    highResponseTimeAlertSentAt: Date,
    highErrorRateAlertSentAt: Date,
    healthScoreWarningSentAt: Date,
    dailySummarySentAt: Date,
    weeklySummarySentAt: Date,
    monthlyReportSentAt: Date,
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    apiKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    environment: {
      type: String,
      enum: ["development", "staging", "production"],
      default: "development",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    notificationPreferences: {
      type: notificationPreferencesSchema,
      default: () => ({}),
    },

    notificationState: {
      type: notificationStateSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
