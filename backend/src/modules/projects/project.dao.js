import Project from './models/project.model.js';

const createProject = async (data) => {
  return await Project.create(data);
};

const findById = async (id) => {
  return await Project.findById(id).select('-owner -visibility');
};

const getAllProjects = async () => {
  try {
    return await Project.find().lean();
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};

export default {
  createProject,
  findById,
  getAllProjects,
};
