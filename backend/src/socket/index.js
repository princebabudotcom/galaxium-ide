import { Server } from 'socket.io';
import logger from '../logger/winston.logger.js';
import socketAuth from '../middlewares/socket.middleware.js';
import agentService from '../services/agent.service.js';
import agentController from '../modules/agent/agent.controller.js';
import agentWorker from '../modules/agent/agent.worker.js';

export let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.use(socketAuth);

  const messages = [];
  const model = 'openai/gpt-oss-20b';

  io.on('connection', (socket) => {
    socket.on('ai-message', async (payload) => {
      await agentController.generateResponse({
        socket,
        payload,
        state: {
          messages,
          model,
        },
      });
    });

    socket.on('ai-project', async (payload) => {
      await agentWorker.generateCodeX({ socket, payload, state: {} });
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};
