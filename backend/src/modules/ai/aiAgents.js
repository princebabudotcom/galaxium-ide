import { text } from 'express';
import ai from '../../config/ai.config.js';

export const planningAgent = async (prompt) => {
  const response = await ai({
    model: '',
    temperature: '',
  });

  const text = await response.invoke(prompt);

  return text.content;
};
