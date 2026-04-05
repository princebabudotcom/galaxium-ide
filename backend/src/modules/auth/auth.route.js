import express from 'express';
import authController from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/getme').get(authMiddleware.protect, authController.getMe);

router.route('/access-token').get(authController.generateAccessToken);

export default router;
