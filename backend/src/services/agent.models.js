import ai from '../config/ai.config.js';
import logger from '../logger/winston.logger.js';

const generateStructure = async ({ messages }) => {
  try {
    const response = await ai.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: messages,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    logger.error(`Something went wrong while generate planning ${error}`);
  }
};

const generateReadme = async ({ project, structure, plan, prompt }) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `
You are a README Generator.

Return ONLY valid Markdown (.md format).

Do NOT return JSON.
Do NOT wrap in code blocks.
Do NOT add explanations.
`,
      },
      {
        role: 'user',
        content: `
User Request:
${prompt}

Project:
- Name: ${project.name}
- Description: ${project.description}
- Type: ${project.type}

Structure:
${JSON.stringify(structure, null, 2)}

Plan:
${JSON.stringify(plan, null, 2)}

Write a professional README.md including:

- Project title
- Description
- Features
- Tech stack
- Installation steps
- Usage
- Folder structure (based on structure)
- Future improvements (optional)
`,
      },
    ];

    const response = await ai.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.4,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    logger.error(`Something went wrong while generating README ${error}`);
  }
};

const generateBackendFile = async ({ project, file, plan }) => {
  const messages = [
    {
      role: 'system',
      content: `
You are a backend code generator.

Generate ONLY the file content.

Rules:
- No explanation
- No markdown
- Clean working Node.js code
`,
    },
    {
      role: 'user',
      content: `
Project: ${project.name}

File:
- Path: ${file.path}
- Description: ${file.description}

Plan:
${JSON.stringify(plan, null, 2)}

Generate the code for this file.
`,
    },
  ];

  const res = await ai.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages,
    temperature: 0.2,
  });

  return {
    path: file.path,
    content: res.choices[0]?.message?.content || '',
  };
};

export default {
  generateStructure,
  generateReadme,
  generateBackendFile,
};
