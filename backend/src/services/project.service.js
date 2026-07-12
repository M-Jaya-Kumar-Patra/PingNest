import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import generateApiKey from "../utils/generateApiKey.js";
import mongoose from "mongoose";

const assertValidProjectId = (projectId) => {
  if (!mongoose.isValidObjectId(projectId)) {
    throw new ApiError(404, "Project not found");
  }
};

export const createProject = async (ownerId, projectData) => {
  const project = await Project.create({
    ...projectData,
    owner: ownerId,
    apiKey: generateApiKey(),
  });

  return project;
};

export const getProjects = async (ownerId) => {
  return await Project.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
};

export const getProjectById = async (projectId, ownerId) => {
  assertValidProjectId(projectId);

  const project = await Project.findOne({
    _id: projectId,
    owner: ownerId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const deleteProject = async (projectId, ownerId) => {
  assertValidProjectId(projectId);

  const project = await Project.findOneAndDelete({
    _id: projectId,
    owner: ownerId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const regenerateApiKey = async (projectId, ownerId) => {
  assertValidProjectId(projectId);

  const project = await Project.findOne({
    _id: projectId,
    owner: ownerId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  project.apiKey = generateApiKey();

  await project.save();

  return project;
};

export const updateProject = async (projectId, ownerId, updateData) => {
  assertValidProjectId(projectId);

  const project = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: ownerId,
    },
    updateData,
    {
      new: true,
    },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};
