import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import * as CONSTANT from '../../constants/constants.js';
import userDao from './user.dao.js';
import ApiError from '../../utils/ApiError.js';
import crypto from 'crypto';
import { timeStringToSeconds } from '../../utils/timeUtils.js';

const generateAccessToken = ({ userId = null, username = null, email = null, version }) => {
  return jwt.sign({ id: userId, username, email, version }, config.JWT_ACCESS_SECRET, {
    expiresIn: CONSTANT.ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = async ({ userId = null }) => {
  const token = jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: CONSTANT.REFRESH_TOKEN_EXPIRATION,
  });

  return token;
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const udateUserSessions = async (userId, sessionData) => {
  const user = await userDao.findById(userId);

  if (!user) throw new ApiError(404, 'User not found');

  user.sessions.push(sessionData);

  await user.save();

  return;
};

const verifyRefreshToken = async (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new ApiError(401, err.message);
  }

  const user = await userDao.findById(decoded.id);
  if (!user) throw new ApiError(404, 'User not found');

  const hashedtoken = hashToken(token);

  const sessionIndex = user.sessions.findIndex((s) => s.refreshToken === hashedtoken);

  // console.log(sessionIndex);

  if (sessionIndex === -1) {
    user.sessions = [];
    await user.save();
    throw new ApiError(403, 'Token reuse detected - all sessions revoked');
  }

  const session = user.sessions[sessionIndex];

  if (session.expiryAt < Date.now()) {
    user.sessions.splice(sessionIndex, 1);
    await user.save();
    throw new ApiError(403, 'Refresh token expired');
  }

  // rotate - new pair of token

  const newAccessToken = generateAccessToken({
    userId: user._id,
    username: user.username,
    email: user.email,
    version: user.tokenVersion,
  });
  const newRefreshToken = await generateRefreshToken({ userId: user._id });

  user.sessions[sessionIndex].refreshToken = hashToken(newRefreshToken);
  user.sessions[sessionIndex].lastUsedAt = new Date();
  user.sessions[sessionIndex].expiryAt =
    Date.now() + timeStringToSeconds(CONSTANT.REFRESH_TOKEN_EXPIRATION) * 1000;

  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const logoutService = async (token) => {
  if (!token) throw new ApiError(401, 'Token not found');

  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(403, 'Invalid refresh token');
  }

  const user = await userDao.findById(decoded.id);
  if (!user) throw new ApiError(404, 'User not found');

  const incomingHash = hashToken(token);

  // remove ONLY matching session
  user.sessions = user.sessions.filter((session) => session.refreshToken !== incomingHash);
  user.tokenVersion += 1;

  await user.save();

  return;
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
  udateUserSessions,
  logoutService,
};
