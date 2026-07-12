import api from "./api";

export const getDashboardSummary = (projectId) =>
  api.get(`/analytics/${projectId}/summary`);

export const getRecentRequests = (projectId) =>
  api.get(`/analytics/${projectId}/recent-requests`);

export const getTopEndpoints = (projectId) =>
  api.get(`/analytics/${projectId}/top-endpoints`);

export const getErrorDistribution = (projectId) =>
  api.get(`/analytics/${projectId}/error-distribution`);

export const getRequestsTimeline = (projectId) =>
  api.get(`/analytics/${projectId}/requests-timeline`);

export const getSlowestEndpoints = (projectId) =>
  api.get(`/analytics/${projectId}/slowest-endpoints`);

export const getHealthScore = (projectId) =>
  api.get(`/analytics/${projectId}/health-score`);
