import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    route: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    statusCode: {
      type: Number,
      required: true,
    },

    responseTime: {
      type: Number,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

telemetrySchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 30,
  },
);

const Telemetry = mongoose.model("Telemetry", telemetrySchema);

export default Telemetry;
