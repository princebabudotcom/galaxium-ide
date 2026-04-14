import Groq from 'groq-sdk';
import config from './config.js';

const ai = new Groq({
  apiKey: config.GROQ_API_KEY,
});

export default ai;
