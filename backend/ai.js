import { ChatGroq } from '@langchain/groq';

import dotenv from 'dotenv';
dotenv.config();

const llm = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  apiKey: process.env.GROQ_API_KEY,
  // other params...
});

const aiMessage = async () => {
  const res = await llm.invoke([
    {
      role: 'user',
      content: 'whats ai job for fresher i am mern developer and how to get 12lpa job',
    },
  ]);

  return res;
};

console.log(await aiMessage());
