import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

async function verifyCallback(payload, done) {
  try {
    const user = await User.findOne({ _id: payload.id });
    
    if(!user) {
      return done(null, false, { message: 'Incorrect e-mail or password' });
    }

    return done(null, user, { message: 'Log in success' });
  }
  catch (err) {
    return done(err);
  }
}

export default () => {
  const config = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(User.createStrategy());
  passport.use(new JWTStrategy(config, verifyCallback));
}