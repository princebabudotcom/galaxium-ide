import ApiError from '../../utils/ApiError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import projectService from './project.service.js';

const createProject = asyncHandler(async (req, res) => {
  const { success, name, message } = await projectService.projectService(req.user?.id, req.body);

  res.status(200).json({
    success,
    name,
    message,
  });
});

const getproject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { success, project, message } = await projectService.getProjectService(id);

  res.status(200).json({
    success,
    project,
    message,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const { success, projects } = await projectService.getAllProjectsService();

  res.status(200).json({
    success,
    projects,
  });
});

export default {
  createProject,
  getproject,
  getAllProjects,
};
