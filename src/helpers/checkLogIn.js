module.exports = function checkLogIn(req, res) {
  if (!req.session.passport) {
    return res.redirect('/auth/google');
  }
  return req.session.passport.user.profile;
};
