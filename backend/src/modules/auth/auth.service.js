import ApiError from '../../utils/ApiError.js';
import userDao from '../user/user.dao.js';

const registerService = async (userData) => {
  const existEmail = await userDao.findByEmail(userData.email);

  if (existEmail) throw new ApiError(404, 'Email already exist');

  const existUsername = await userDao.findByUsername(userData.username);

  if (existUsername) throw new ApiError(404, 'Username already exist');

  const user = await userDao.createUser(userData);

  return {
    id: user._id,
    name: user.fullName,
    email: user.email,
    username: user.username,
  };
};

const loginService = async (loginData) => {
  const { identifier, password } = loginData;

  const user = await userDao.findyByIdentifier(identifier);

  if (!user) throw new ApiError(404, 'User not found');

  if (!(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials');

  return {
    id: user._id,
    name: user.fullName,
    email: user.email,
    username: user.username,
  };
};

export default {
  registerService,
  loginService,
};
