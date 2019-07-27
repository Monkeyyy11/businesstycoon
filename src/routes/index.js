// This file’s router holds all your routes. This is the only router that your application has to load at startup.
var router = require('express').Router();
const passport = require('passport');
const auth = require('../middleware/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', (req, res, next) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set',
      user: req.user
    });
  }
  else {
    res.cookie('token', '');
    res.json({
      status: 'session cookie not set2',
      user: req.user
    });
  }
  // res.render('index');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  });

module.exports = router;
