import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    plan: {
      type: String,
      enum: ["FREE", "PRO", "BUSINESS"],
      default: "FREE",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },

    maxProjects: {
      type: Number,
      default: 3,
    },

    maxMonitorCredits: {
      type: Number,
      default: 20,
    },

    maxRequests: {
      type: Number,
      default: 10000,
    },

    projectsUsed: {
      type: Number,
      default: 0,
    },

    monitorCreditsUsed: {
      type: Number,
      default: 0,
    },

    requestsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Subscription", subscriptionSchema);
