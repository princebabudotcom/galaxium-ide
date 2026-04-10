import config from '../config/config.js';
import authController from '../modules/auth/auth.controller.js';
import userDao from '../modules/user/user.dao.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const socketAuth = async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');

    if (!cookies?.refreshToken) {
      next(new Error('Authentication error : No token provided'));
    }

    const decoded = jwt.verify(cookies.refreshToken, config.JWT_REFRESH_SECRET);

    const user = await userDao.findById(decoded.id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    socket.user = user;

    next();
  } catch (error) {
    next(new ApiError(401, 'Authentication failed'));
  }
};

export default socketAuth;
