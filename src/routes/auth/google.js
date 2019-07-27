var router = require('express').Router();
const passport = require('passport');
const auth = require('../../middleware/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  });

module.exports = router;
