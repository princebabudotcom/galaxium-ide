import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import config from './config.js';
import userDao from '../modules/user/user.dao.js';
import logger from '../logger/winston.logger.js';
import passport from 'passport';

const generateUsername = (name) => {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_') // remove special chars
    .replace(/_+/g, '_') // avoid multiple underscores
    .replace(/^_|_$/g, ''); // trim underscores

  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit

  return `${base}_${random}`;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL:
        config.NODE_ENV === 'production' ? config.callbackURL : '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find user with the googleId

        let user = await userDao.findByGoogleId(profile.id);

        if (!user && profile.emails && profile.emails.length > 0) {
          // If user with the googleId is not found, try finding user with the same email
          user = await userDao.findByEmail(profile.emails[0].value);

          // If user exist with same email but not googleId then update that user with googleId
          if (user) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          // if user with googleId not found and also user with same email not found then create new user with googleId
          user = await userDao.createUserWithGoogle({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            username: generateUsername(profile.displayName),
          });
          logger.info('New user created with Google ID:', `${user.fullname} (${user.email})`);
        }

        return done(null, user);
      } catch (error) {
        logger.error('Error in GoogleStrategy:', error);
        return done(error, null);
      }
    }
  )
);

// 🔥 STRATEGY
passport.use(
  new GitHubStrategy(
    {
      clientID: config.githubClientID,
      clientSecret: config.githubClientSecret,
      callbackURL: '/api/v1/auth/github/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userDao.findByGithubId(profile.id);

        if (!user && profile?.id && profile?.username) {
          user = await userDao.findByUsername(profile?.username);

          if (user) {
            user.githubId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          user = await userDao.createUser({
            githubId: profile.id,
            fullName: profile.displayName,
            username: profile.username,
            email: profile?.emails?.[0]?.value,
            avatar: profile?.photos[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        // throw new Error("Something went wrong" , error);
        console.log(error);
      }
    }
  )
);

export default passport;
