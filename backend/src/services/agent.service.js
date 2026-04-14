import ai from '../config/ai.config.js';
import logger from '../logger/winston.logger.js';

const generatePlanning = async ({ messages }) => {
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

const generateFrontend = async (messages) => {
  try {
    const responser = await ai.chat.completions.create({
      model: 'moonshotai/kimi-k2-instruct',
      messages: messages,
      temperature: 0.3,
    });

    return responser.choices[0]?.message?.content || '';
  } catch (error) {
    logger.error(`Something went wrong while generate text`);
  }
};

export default {
  generateFrontend,
  generatePlanning,
};
