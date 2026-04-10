import express from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import userController from './user.controller.js';

const router = express.Router();

router
  .route('/ai-config')
  .patch(authMiddleware.protect, userController.aiConfig)
  .get(authMiddleware.protect, userController.userAiCOnfig);

export default router;
