import { ChatGroq } from '@langchain/groq';
import config from './config.js';

const ai = ({}) => {
  const llm = new ChatGroq({
    model: 'openai/gpt-oss-20b',
    temperature: 0,
    maxTokens: 500,
    maxRetries: 3,
    apiKey: config.GROQ_API_KEY,
  });

  return llm;
};

export default ai;
