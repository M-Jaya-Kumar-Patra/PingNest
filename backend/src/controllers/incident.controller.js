import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getProjectIncidents,
  getIncidentById,
  getIncidentSummary,
} from "../services/incident.service.js";

export const getIncidentsController =
  asyncHandler(async (req, res) => {
    const incidents =
      await getProjectIncidents(
        req.params.projectId
      );

    return res.json(
      new ApiResponse(
        200,
        incidents,
        "Incidents fetched"
      )
    );
  });

export const getIncidentController =
  asyncHandler(async (req, res) => {
    const incident =
      await getIncidentById(
        req.params.id
      );

    return res.json(
      new ApiResponse(
        200,
        incident,
        "Incident fetched"
      )
    );
  });

export const getIncidentSummaryController =
  asyncHandler(async (req, res) => {
    const summary =
      await getIncidentSummary(
        req.params.projectId
      );

    return res.json(
      new ApiResponse(
        200,
        summary,
        "Incident summary fetched"
      )
    );
  });


  export const getIncidentByIdController =
  asyncHandler(async (req, res) => {
    const incident =
      await getIncidentById(
        req.params.incidentId,
      );

    return res.json(
      new ApiResponse(
        200,
        incident,
        "Incident fetched",
      ),
    );
  });