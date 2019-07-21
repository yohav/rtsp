import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import mongoose from 'mongoose';

import User from '../api/user/user.dao';
import jwtSecret from './jwtConfig';

const BCRYPT_SALT_ROUNDS = 12;

const LocalStrategy = passportLocal.Strategy;
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const ObjectId = mongoose.Types.ObjectId;

passport.use(
  'register',
  new LocalStrategy(
    async (username, password, done) => {
      try {
        let existedUser = await User.get({username: username});
        if (existedUser) {
          return done(null, false, {message: 'Username already taken'});
        } else {
          let hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
          let newUser = await User.register({
              username: username,
              password: hashedPassword
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  ));



passport.use(
  'login',
  new LocalStrategy(
    async (username, password, done) => {
      try {
          let existedUser = await User.get({username: username});
          if(existedUser === null){
              return done(null, false, { message: 'User not found' });
          }
          let isGoodPassword = await bcrypt.compare(password, existedUser.password);
          if(!isGoodPassword){
              return done(null, false, { message: 'Username and password don\'t match' });
          }
          return done(null, existedUser);
      } catch (err) {
        done(err);
      }
    },
  ),
);


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts,
      async (jwt_payload, done) => {
    try {
        console.log("in jwt check");
        console.log(jwt_payload);
        let existedUser = await User.get({_id: new ObjectId(jwt_payload.id)});
        if (existedUser) {
          done(null, existedUser);
        } else {
          done(null, false);
        }
    } catch (err) {
      done(err);
    }
  }),
);
