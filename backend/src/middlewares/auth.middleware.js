import config from '../config/config.js';
import userDao from '../modules/user/user.dao.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.JWT_SECRET);
    // console.log('DECODED:', decoded);

    const user = await userDao.findById(decoded.id); // 

    if (!user) throw new ApiError(404, 'User not found');

    req.user = user;

    next();
  } catch (error) {
    console.error('AUTH ERROR:', error); // 🔥 MUST
    next(error); // 🔥 DON'T OVERRIDE
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden: insufficient permissions');
    }
    next();
  };
};

export default {
  protect,
  restrictTo,
};
