import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UptimeMonitor",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    severity: {
      type: String,
      enum: ["CRITICAL", "HIGH", "MEDIUM", "LOW"],
      default: "HIGH",
    },

    status: {
      type: String,
      enum: ["OPEN", "RESOLVED"],
      default: "OPEN",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Incident", incidentSchema);
