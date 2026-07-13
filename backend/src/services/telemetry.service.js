import Project from "../models/project.model.js";
import Telemetry from "../models/telemetry.model.js";
import ApiError from "../utils/ApiError.js";
import { getIO } from "../sockets/socket.js";

export const ingestTelemetry = async (payload) => {
  const project = await Project.findOne({
    apiKey: payload.apiKey,
  });

  if (!project) {
    throw new ApiError(401, "Invalid API key");
  }

  const telemetry = await Telemetry.create({
    project: project._id,

    route: payload.route,

    method: payload.method,

    service: payload.service,

    statusCode: payload.statusCode,

    responseTime: payload.responseTime,
  });

  getIO().to(project._id.toString()).emit("telemetry:new", telemetry);

  return telemetry;
};
