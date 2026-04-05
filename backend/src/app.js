import express from 'express';
import http from 'http';
import morganLogger from './logger/morgan.looger.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

const httpServer = http.createServer(app);

// middleware
app.use(
  express.json({
    limit: '10mb',
  })
);
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // for serving static files from the "public" directory
app.use(cookieParser()); // for parsing cookies in incoming requests
app.use(morganLogger);

// routes
import authRoutes from './modules/auth/auth.route.js';

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Galaxium-IDE API',
    version: '1.0.0',
  });
});

app.use(errorMiddleware);

export default httpServer;
