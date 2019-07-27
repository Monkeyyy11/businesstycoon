// This file’s router holds all your routes. This is the only router that your application has to load at startup.
var router = require('express').Router();
const passport = require('passport');
const auth = require('../middleware/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', (req, res, next) => res.render('index', {
  loggedIn: req.user
}));

router.get('/logout', (req, res) => {
  if (!req.user) {
    req.logout();
    req.session = null;
  }
  return res.redirect('/');
});

router.use('/auth', require('./auth'));

module.exports = router;
