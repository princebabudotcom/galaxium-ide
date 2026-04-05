import asyncHandler from '../../utils/asyncHandler.js';
import userService from '../user/user.service.js';
import authService from './auth.service.js';
import * as CONSTANTS from '../../constants/constants.js';
import config from '../../config/config.js';
import { timeStringToSeconds } from '../../utils/timeUtils.js';
import ApiError from '../../utils/ApiError.js';

const register = asyncHandler(async (req, res) => {
  const userData = await authService.registerService(req.body);

  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
  });

  const refreshToken = await userService.generateAccessToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds
  });

  const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: userData,
  });
});

const login = asyncHandler(async (req, res) => {
  const userData = await authService.loginService(req.body);
  const accessToken = userService.generateAccessToken({
    userId: userData.id,
    username: userData.username,
    email: userData.email,
  });

  const refreshToken = await userService.generateAccessToken({
    userId: userData.id,
  });

  const refreshExpirySecs = timeStringToSeconds(CONSTANTS.REFRESH_TOKEN_EXPIRATION);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds
  });

  const accessExpirySecs = timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds
  });

  res.status(201).json({
    success: true,
    message: 'User Login successfully',
    data: userData,
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

const generateAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new ApiError(401, 'No refresh token provided');

  const user = await userService.verifyRefreshToken(refreshToken);

  const token = userService.generateAccessToken({
    userId: user._id,
    username: user.username,
    email: user.email,
  });

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: timeStringToSeconds(CONSTANTS.ACCESS_TOKEN_EXPIRATION) * 1000,
  });

  res.status(200).json({
    success: true,
    message: 'Access token generated successfully',
    data: { accessToken: token },
  });
});

export default {
  register,
  login,
  getMe,
  generateAccessToken,
};
