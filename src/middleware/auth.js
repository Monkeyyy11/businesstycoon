const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  }); passport.deserializeUser((user, done) => {
    done(null, user);
  }); passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEAUTH_CLIENTID,
    clientSecret: process.env.GOOGLEAUTH_CLIENTSECRET,
    callbackURL: process.env.GOOGLEAUTH_CALLBACKURL
  },
  (token, refreshToken, profile, done) => done(null, {
    profile,
    token
  })));
};
