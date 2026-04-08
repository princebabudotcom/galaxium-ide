import config from '../config/config.js';
import logger from '../logger/winston.logger.js';
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

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

    // console.log(decoded);
    const user = await userDao.findById(decoded.id); //

    // console.log({
    //   decoded,
    //   user: user.tokenVersion,
    // });

    if (!user || user.tokenVersion !== decoded.version)
      throw new ApiError(401, 'Session invalidated. Please log in again.');

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, 'Unauthorized');
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
