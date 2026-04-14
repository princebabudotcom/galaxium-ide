import express from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import projectController from './project.controller.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/create').post(authMiddleware.protect, projectController.createProject);

router.route('/:id').get(projectController.getproject);

router.route('/').get(projectController.getAllProjects);

export default router;
