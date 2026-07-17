import Incident from "../models/incident.model.js";

export const createIncident = async ({
  projectId,
  monitorId,
  title,
  description,
  severity,
}) => {
  return await Incident.create({
    project: projectId,
    monitor: monitorId,
    title,
    description,
    severity,
  });
};

export const resolveIncident = async (monitorId) => {
  const incident = await Incident.findOne({
    monitor: monitorId,
    status: "OPEN",
  });

  if (!incident) return null;

  incident.status = "RESOLVED";

  incident.resolvedAt = new Date();

  await incident.save();

  return incident;
};

export const getProjectIncidents = async (projectId) => {
  return await Incident.find({
    project: projectId,
  })
    .populate("monitor", "name")
    .sort({
      createdAt: -1,
    });
};

export const getIncidentById = async (incidentId) => {
  return await Incident.findById(incidentId).populate("monitor", "name url");
};



export const getIncidentSummary = async (projectId) => {
  const incidents = await Incident.find({
    project: projectId,
  });

  const openIncidents = incidents.filter(
    (i) => i.status === "OPEN"
  ).length;

  const resolvedIncidents = incidents.filter(
    (i) => i.status === "RESOLVED"
  ).length;

  const criticalIncidents = incidents.filter(
    (i) => i.severity === "CRITICAL"
  ).length;

  let totalDowntime = 0;

  incidents.forEach((incident) => {
    if (
      incident.status === "RESOLVED" &&
      incident.resolvedAt
    ) {
      totalDowntime +=
        new Date(incident.resolvedAt) -
        new Date(incident.createdAt);
    }
  });

  return {
    openIncidents,
    resolvedIncidents,
    criticalIncidents,
    totalDowntimeMinutes:
      Math.round(totalDowntime / 60000),
  };
};