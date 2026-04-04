import express from 'express';
import http from 'http';
import morganLogger from './logger/morgan.looger.js';
const app = express();

const httpServer = http.createServer(app);

// middleware
app.use(
  express.json({
    limit: '10mb',
  })
);

app.use(morganLogger);

// routes

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Galaxium-IDE API',
    version: '1.0.0',
  });
});

export default httpServer;
