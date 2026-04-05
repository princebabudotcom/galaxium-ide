import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import * as CONSTANT from '../../constants/constants.js';
import userDao from './user.dao.js';
import ApiError from '../../utils/ApiError.js';

const generateAccessToken = ({ userId = null, username = null, email = null }) => {
  return jwt.sign({ id: userId, username, email }, config.JWT_SECRET, {
    expiresIn: CONSTANT.ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = async ({ userId = null }) => {
  const token = jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: CONSTANT.REFRESH_TOKEN_EXPIRATION,
  });

  return token;
};

const verifyRefreshToken = async (token) => {
  try {
    if (!token) throw new ApiError(401, 'No refresh token provided');

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded || !decoded.id) throw new ApiError(401, 'Invalid refresh token');

    const user = await userDao.findById(decoded.id);

    if (!user) throw new ApiError(404, 'User not found');

    return user;
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
