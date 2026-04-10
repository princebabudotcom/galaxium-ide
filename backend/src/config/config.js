import dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/galaxium',

  // authentication
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,

  githubClientID: process.env.GITHUB_CLIENTID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,

  // ai
  GROQ_API_KEY: process.env.GROQ_API_KEY,
};

export default config;
