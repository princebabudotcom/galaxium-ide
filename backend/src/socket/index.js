import { Server } from 'socket.io';
import logger from '../logger/winston.logger.js';
import socketAuth from '../middlewares/socket.middleware.js';
import { planningAgent } from '../modules/ai/aiAgents.js';

export let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    // options
  });

  io.use(socketAuth);

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id} with user ${socket.user.email}`);

    const prompt = [];

    socket.on('ai-message', async (payload) => {
      prompt.push(payload);

      const res = await planningAgent(prompt);

      prompt.push({
        role: 'ai',
        content: res,
      });

      console.log(prompt);

      socket.emit('ai-response', res);
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};
