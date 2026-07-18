// uptimeLog.model.js

import mongoose from "mongoose";

const uptimeLogSchema = new mongoose.Schema(
  {
    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UptimeMonitor",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["UP", "DOWN"],
      required: true,
    },

    responseTime: {
      type: Number,
      default: 0,
    },

    statusCode: Number,

    errorMessage: String,
  },
  {
    timestamps: true,
  },
);
uptimeLogSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 30,
  }
);

export default mongoose.model("UptimeLog", uptimeLogSchema);
