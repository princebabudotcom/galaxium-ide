import mongoose from 'mongoose';
import config from './config.js';
import logger from '../logger/winston.logger.js';

const connectDB = () => {
  mongoose
    .connect(config.DB_URI, {})
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((err) => {
      logger.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1);
    });
};

export default connectDB;
