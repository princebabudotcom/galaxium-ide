import logger from '../../logger/winston.logger.js';
import agentModels from '../../services/agent.models.js';
import { createStructurePrompt } from '../../services/prompts/prompt.js';
import { parseLLMResponse } from '../../utils/jsonFormat.js';
import File from '../projects/models/file.model.js';
import projectDao from '../projects/project.dao.js';

const messages = [];

const createStructure = async ({ prompt, messages, project }) => {
  try {
    // system instructions
    messages.push({
      role: 'system',
      content: createStructurePrompt(project, prompt),
    });

    const response = await agentModels.generateStructure({ messages });

    if (!response) {
      logger.error(`Something went wrong ${error}`);
    }

    return {
      success: true,
      data: parseLLMResponse(response),
    };
  } catch (error) {
    logger.error(`Something went wrong ${error}`);
  }
};

const generateCodeX = async ({ socket, payload, state }) => {
  try {
    // metadata

    const { projectid, prompt } = payload;
    const project = await projectDao.findById(projectid);

    const structure = await createStructure({ messages: messages, prompt, project });

    if (!structure.success) {
      logger.error(`Something went wrong in this`);
    }

    const readmeMd = await agentModels.generateReadme({
      plan: structure.data?.plan,
      project,
      prompt,
      structure: structure.data.structure,
    });

    const backendSection = structure.data.structure.find((s) => s.section === 'backend');

    const files = backendSection?.files || [];

    const backendFiles = await Promise.all(
      files.map((file) =>
        agentModels.generateBackendFile({
          file,
          project,
          plan: structure.data?.plan,
        })
      )
    );

    const allfiles = [
      ...backendFiles,
      {
        path: '/README.md',
        content: readmeMd,
      },
    ];

    allfiles.forEach((file) => {
      socket.emit('file-generated', file);
    });

    if (!project.files?.length) {
      await File.insertMany(
        allfiles.map((file) => ({
          projectId: project._id,
          path: file.path,
          content: file.content,
          language: 'javascript',
          type: 'file',
        }))
      );
    }
  } catch (error) {
    logger.error(`Something went wrong ${error}`);
  }
};

export default {
  createStructure,
  generateCodeX,
};
