import ApiError from '../../utils/ApiError.js';
import projectDao from './project.dao.js';

const projectService = async (userId, data) => {
  console.log(userId);
  if (!data || !data.name) {
    throw new ApiError(404, 'Project data not found');
  }

  const payload = {
    name: data.name,
    description: data.description,
    type: data.type,
    techStack: data.techStack,
    owner: userId,
  };

  const newproject = await projectDao.createProject(payload);

  if (!newproject) {
    throw new ApiError(404, 'Project not found');
  }

  return {
    success: true,
    name: newproject.name,
    message: `Project is created sucessfully with ${newproject.name}`,
  };
};

const getProjectService = async (id) => {
  if (!id) {
    throw new ApiError(404, 'Project params id not found');
  }

  const project = await projectDao.findById(id);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return {
    success: true,
    project,
    message: `Project data fetch succesfully with ${project.name}`,
  };
};

const getAllProjectsService = async () => {
  const projects = await projectDao.getAllProjects();

  console.log(projects);

  if (!projects?.length) {
    throw new ApiError(404, 'No project found');
  }

  return {
    success: true,
    projects,
  };
};

export default {
  projectService,
  getProjectService,
  getAllProjectsService,
};
