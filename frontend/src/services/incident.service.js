import api from "./api";

export const getIncidents = (projectId) =>
  api.get(`/incidents/project/${projectId}`);

export const getIncidentSummary = (projectId) =>
  api.get(`/incidents/project/${projectId}/summary`);

export const getIncidentById = (incidentId) =>
  api.get(`/incidents/${incidentId}`);
