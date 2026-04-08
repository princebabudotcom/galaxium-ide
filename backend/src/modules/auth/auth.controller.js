import asyncHandler from '../../utils/asyncHandler.js';
import userService from '../user/user.service.js';
import authService from './auth.service.js';
import * as CONSTANTS from '../../constants/constants.js';
import config from '../../config/config.js';
import { timeStringToSeconds } from '../../utils/timeUtils.js';
import ApiError from '../../utils/ApiError.js';

const cookiesOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION) * 1000, // Convert to milliseconds
};

const MAX_SESSIONS = 5; // Maximum allowed sessions per user

const register = asyncHandler(async (req, res) => {
  const userData = await authService.registerService(req.body);

  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
    version: userData.version,
  });

  const refreshToken = await userService.generateRefreshToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  // const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  const hashedRefreshToken = userService.hashToken(refreshToken);

  if (userData.sessions.length >= MAX_SESSIONS) {
    throw new ApiError(
      403,
      'Maximum sessions limit reached. Please log out from other devices to continue.'
    );
  }

  const sessionData = {
    refreshToken: hashedRefreshToken,
    device: req.headers['user-agent'] || 'unknown',
    ipAddress: req.ip || 'unknown',
    lastUsedAt: new Date(), // Track when the session was last used
    expiryAt: new Date(Date.now() + refreshExpirySecs * 1000), // Set expiry time for the session
  };

  await userService.udateUserSessions(userData.id, sessionData);

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: userData,
    accessToken,
  });
});

const login = asyncHandler(async (req, res) => {
  const userData = await authService.loginService(req.body);

  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
    version: userData.version,
  });

  const refreshToken = await userService.generateRefreshToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  // const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  const hashedRefreshToken = userService.hashToken(refreshToken);

  if (userData.sessions.length >= MAX_SESSIONS) {
    throw new ApiError(
      403,
      'Maximum sessions limit reached. Please log out from other devices to continue.'
    );
  }

  const sessionData = {
    refreshToken: hashedRefreshToken,
    device: req.headers['user-agent'] || 'unknown',
    ipAddress: req.ip || 'unknown',
    lastUsedAt: new Date(), // Track when the session was last used
    expiryAt: new Date(Date.now() + refreshExpirySecs * 1000), // Set expiry time for the session
  };

  await userService.udateUserSessions(userData.id, sessionData);

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  res.status(201).json({
    success: true,
    message: 'User Login successfully',
    data: userData,
    accessToken,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user._id;

  if (!user) throw new ApiError(404, 'User not found');

  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: {
      id: req.user._id,
      name: req.user.fullName,
      email: req.user.email,
      username: req.user.username,
      avatar: req?.user?.avatar,
    },
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) throw new ApiError(404, 'Refresh token not found');

  const { accessToken, refreshToken } = await userService.verifyRefreshToken(token);

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  res.status(200).json({
    accessToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  await userService.logoutService(req?.cookies?.refreshToken);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  return res.status(200).json({
    message: 'Logout sucessfully',
  });
});

const logoutAll = asyncHandler(async (req, res) => {});

const googleLogin = asyncHandler(async (req, res) => {
  const userData = req.user;

  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
    version: userData.version,
  });

  const refreshToken = await userService.generateRefreshToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  // const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  const hashedRefreshToken = userService.hashToken(refreshToken);

  if (userData.sessions.length >= MAX_SESSIONS) {
    throw new ApiError(
      403,
      'Maximum sessions limit reached. Please log out from other devices to continue.'
    );
  }

  const sessionData = {
    refreshToken: hashedRefreshToken,
    device: req.headers['user-agent'] || 'unknown',
    ipAddress: req.ip || 'unknown',
    lastUsedAt: new Date(), // Track when the session was last used
    expiryAt: new Date(Date.now() + refreshExpirySecs * 1000), // Set expiry time for the session
  };

  await userService.udateUserSessions(userData.id, sessionData);

  res.cookie('refreshToken', refreshToken, cookiesOptions);
  res.redirect(`http://localhost:5173/auth/login`);
  res.status(200).json({
    accessToken,
  });

  return;
});

const githubLogin = asyncHandler(async (req, res) => {
  const userData = req.user;

  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
    version: userData.version,
  });

  const refreshToken = await userService.generateRefreshToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  // const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  const hashedRefreshToken = userService.hashToken(refreshToken);

  if (userData.sessions.length >= MAX_SESSIONS) {
    throw new ApiError(
      403,
      'Maximum sessions limit reached. Please log out from other devices to continue.'
    );
  }

  const sessionData = {
    refreshToken: hashedRefreshToken,
    device: req.headers['user-agent'] || 'unknown',
    ipAddress: req.ip || 'unknown',
    lastUsedAt: new Date(), // Track when the session was last used
    expiryAt: new Date(Date.now() + refreshExpirySecs * 1000), // Set expiry time for the session
  };

  await userService.udateUserSessions(userData.id, sessionData);

  res.cookie('refreshToken', refreshToken, cookiesOptions);
  res.redirect(`http://localhost:5173/auth/login`);
  res.status(200).json({
    accessToken,
  });

  return;
});

export default {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  logoutAll,
  googleLogin,
  githubLogin,
};
