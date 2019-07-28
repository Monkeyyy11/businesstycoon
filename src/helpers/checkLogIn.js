module.exports = function checkLogIn(req, res) {
  if (!req.session.passport) {
    return res.status(201).send('Unauthorized!');
  }
  return req.session.passport.user.profile;
};
