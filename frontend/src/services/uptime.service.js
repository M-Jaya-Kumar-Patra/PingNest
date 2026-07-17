import api from "./api";

export const getMonitors = (projectId) => api.get(`/uptime/${projectId}`);

export const getUptimeSummary = (projectId) =>
  api.get(`/uptime/${projectId}/summary`);

export const createMonitor = (projectId, data) =>
  api.post(`/uptime/${projectId}`, data);

export const deleteMonitor = (monitorId) => api.delete(`/uptime/${monitorId}`);

export const getMonitorLogs = (monitorId) =>
  api.get(`/uptime/logs/${monitorId}`);

export const getMonitorStats = (monitorId) =>
  api.get(`/uptime/stats/${monitorId}`);

export const getMonitor = (monitorId) =>
  api.get(`/uptime/monitor/${monitorId}`);

export const toggleMonitor = (monitorId) =>
  api.patch(`/uptime/toggle/${monitorId}`);

export const updateMonitor = (monitorId, payload) =>
  api.patch(`/uptime/${monitorId}`, payload);
