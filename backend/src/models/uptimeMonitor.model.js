// uptimeMonitor.model.js

import mongoose from "mongoose";

const uptimeMonitorSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "GET",
    },

    interval: {
      type: Number,
      enum: [1, 5, 15],
      default: 5,
    },

    status: {
      type: String,
      enum: ["UP", "DOWN", "UNKNOWN"],
      default: "UNKNOWN",
    },

    lastCheckedAt: Date,

    lastResponseTime: {
      type: Number,
      default: 0,
    },

    consecutiveFailures: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("UptimeMonitor", uptimeMonitorSchema);
