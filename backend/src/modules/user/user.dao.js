import User from './user.model.js';

const createUser = async (userdata) => {
  return await User.create(userdata);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

const findyByIdentifier = async (identifier) => {
  return await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).select('+password');
};

const findById = async (id) => {
  return await User.findById(id);
};

const findByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

const findByGithubId = async (githubId) => {
  return await User.findOne({ githubId });
};

const createUserWithGoogle = async (userData) => {
  return await User.create(userData);
};

const updateAiConfig = async (data, userId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $set: { aiConfig: data } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );
};

const aiConfig = async (userId) => {
  return await User.findOne({ _id: userId }).select('aiConfig').lean();
};

export default {
  findByEmail,
  createUser,
  findByUsername,
  findyByIdentifier,
  findById,
  findByGoogleId,
  createUserWithGoogle,
  findByGithubId,
  updateAiConfig,
  aiConfig,
};
