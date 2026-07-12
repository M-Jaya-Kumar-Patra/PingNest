import Project from "../models/project.model.js";
import Telemetry from "../models/telemetry.model.js";
import { getHealthScore } from "./analytics.service.js";

export const getAverageHealthScore =
  async (ownerId) => {

    const projects =
      await Project.find({
        owner: ownerId,
      });

    if (
      projects.length === 0
    ) {
      return 0;
    }

    let totalScore = 0;

    for (const project of projects) {

      const score =
        await getHealthScore(
          project._id,
          ownerId
        );

      totalScore += score;

    }

    return Math.round(
      totalScore /
      projects.length
    );
};

export const getDashboardOverview =
  async (ownerId) => {

    const projects =
      await Project.find({
        owner: ownerId,
      }).lean();

    const totalProjects =
      projects.length;

    const activeProjects =
      projects.filter(
        (project) =>
          project.status ===
          "active"
      ).length;

    const projectIds =
      projects.map(
        (project) =>
          project._id
      );

    const totalRequests =
      await Telemetry.countDocuments({
        project: {
          $in: projectIds,
        },
      });

    const averageHealthScore =
      await getAverageHealthScore(
        ownerId
      );

    const projectsWithLastRequest =
      await Promise.all(
        projects.map(
          async (project) => {

            const lastRequest =
              await Telemetry
                .findOne({
                  project:
                    project._id,
                })
                .sort({
                  createdAt: -1,
                })
                .select(
                  "createdAt"
                );

            return {
              ...project,
              lastRequest:
                lastRequest?.createdAt ||
                null,
            };

          }
        )
      );

    return {
      totalProjects,
      activeProjects,
      totalRequests,
      averageHealthScore,
      projects:
        projectsWithLastRequest,
    };
};



