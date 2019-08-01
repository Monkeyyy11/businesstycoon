module.exports = function checkLogIn(req, res) {
  if (!req.session.passport) {
    return false;
  }
  return req.session.passport.user.profile;
};
