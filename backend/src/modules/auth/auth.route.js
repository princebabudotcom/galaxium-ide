import express, { Router } from 'express';
import authController from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import passport from 'passport';

const router = express.Router();

router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/getme').get(authMiddleware.protect, authController.getMe);

router.route('/refresh-token').post(authController.refreshToken);

router.route('/logout').get(authMiddleware.protect, authController.logout);

// 4. google auth route
// Route to initiate Google OAuth flow
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleLogin
  );

// 🔹 Start GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// 🔹 Callback
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  authController.githubLogin
);
export default router;
