import api from "./api";

export const getProjects = () => api.get("/projects");

export const getProject = (id) => api.get(`/projects/${id}`);

export const createProject = (data) => api.post("/projects", data);

export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const regenerateApiKey = (id) =>
  api.post(`/projects/${id}/regenerate-api-key`);

export const updateProject = (projectId, payload) =>
  api.patch(`/projects/${projectId}`, payload);
