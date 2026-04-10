import asyncHandler from '../../utils/asyncHandler.js';
import userService from './user.service.js';

const aiConfig = asyncHandler(async (req, res) => {
  const { success, message } = await userService.aiConfigService(req.body, req.user._id);

  return res.status(200).json({
    success,
    message,
  });
});

const userAiCOnfig = asyncHandler(async (req, res) => {
  const { success, aiConfig } = await userService.userAiConfigService(req.user._id);

  return res.status(200).json({
    success,
    aiConfig,
  });
});

export default {
  aiConfig,
  userAiCOnfig,
};
