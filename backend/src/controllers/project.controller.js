import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  regenerateApiKey,
  updateProject,
} from "../services/project.service.js";

export const createProjectController = asyncHandler(async (req, res) => {
  const project = await createProject(req.user._id, req.validatedData);

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

export const getProjectsController = asyncHandler(async (req, res) => {
  const projects = await getProjects(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

export const getProjectController = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

export const deleteProjectController = asyncHandler(async (req, res) => {
  await deleteProject(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully"));
});

export const regenerateApiKeyController = asyncHandler(async (req, res) => {
  const project = await regenerateApiKey(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "API key regenerated successfully"));
});

export const updateProjectController = asyncHandler(async (req, res) => {
  const project = await updateProject(
    req.params.id,
    req.user._id,
    req.validatedData,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});
