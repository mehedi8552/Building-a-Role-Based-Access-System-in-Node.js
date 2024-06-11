
const {SECRATE} = require("../config/ConfigEnv.js")
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require('../Models/User'); // Replace with your actual User model


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRATE
};


module.exports = passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};