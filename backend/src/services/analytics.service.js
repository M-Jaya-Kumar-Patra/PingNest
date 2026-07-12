import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import Telemetry from "../models/telemetry.model.js";
import mongoose from "mongoose";

const validateProjectOwnership = async (projectId, ownerId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: ownerId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const getTotalRequests = async (projectId) => {
  return await Telemetry.countDocuments({
    project: projectId,
  });
};

export const getAverageResponseTime = async (projectId) => {
  const result = await Telemetry.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $group: {
        _id: null,
        avgResponseTime: {
          $avg: "$responseTime",
        },
      },
    },
  ]);

  return result[0]?.avgResponseTime || 0;
};

export const getSuccessRate = async (projectId) => {
  const total = await Telemetry.countDocuments({
    project: projectId,
  });

  const success = await Telemetry.countDocuments({
    project: projectId,
    statusCode: {
      $gte: 200,
      $lt: 400,
    },
  });

  if (total === 0) return 0;

  return (success / total) * 100;
};

export const getDashboardSummary = async (projectId, ownerId) => {
  await validateProjectOwnership(projectId, ownerId);

  const [totalRequests, averageResponseTime, successRate] = await Promise.all([
    getTotalRequests(projectId),
    getAverageResponseTime(projectId),
    getSuccessRate(projectId),
  ]);

  return {
    totalRequests,
    averageResponseTime,
    successRate,
    errorRate: 100 - successRate,
  };
};

export const getRecentRequests = async (projectId, ownerId) => {
  await validateProjectOwnership(projectId, ownerId);

  return await Telemetry.find({
    project: projectId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(20)
    .select("route method statusCode responseTime createdAt");
};

export const getTopEndpoints = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await Telemetry.aggregate([
    {
      $match: {
        project: project._id,
      },
    },
    {
      $group: {
        _id: "$route",
        requests: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        requests: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};

export const getErrorDistribution = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await Telemetry.aggregate([
    {
      $match: {
        project: project._id,
        statusCode: {
          $gte: 400,
        },
      },
    },
    {
      $group: {
        _id: "$statusCode",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);
};

export const getRequestsTimeline = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await Telemetry.aggregate([
    {
      $match: {
        project: project._id,
      },
    },
    {
      $group: {
        _id: {
          hour: {
            $hour: "$createdAt",
          },
        },

        requests: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.hour": 1,
      },
    },
  ]);
};

export const getSlowestEndpoints = async (projectId, ownerId) => {
  const project = await validateProjectOwnership(projectId, ownerId);

  return await Telemetry.aggregate([
    {
      $match: {
        project: project._id,
      },
    },
    {
      $group: {
        _id: "$route",

        avgResponseTime: {
          $avg: "$responseTime",
        },
      },
    },
    {
      $sort: {
        avgResponseTime: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};

export const getHealthScore = async (projectId, ownerId) => {
  const summary = await getDashboardSummary(projectId, ownerId);

  let score = 100;

  score -= summary.errorRate;

  score -= summary.averageResponseTime / 20;

  if (score < 0) {
    score = 0;
  }

  return Math.round(score);
};
