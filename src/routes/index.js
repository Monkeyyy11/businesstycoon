/*
This file’s router holds all your routes.
This is the only router that your application has to load at startup.
*/

var router = require('express').Router();
const passport = require('passport');
const auth = require('../middleware/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', (req, res, next) => res.render('index', {
  loggedIn: req.session.passport ? req.session.passport.user.profile : false
}));

router.get('/logout', (req, res) => {
  if (!req.user) {
    req.logout();
    req.session = null;
  }
  return res.redirect('/');
});

router.get('/error', (req, res) => {
  return res.render('error', {
    statuscode: req.query.statuscode,
    message: req.query.message
  });
});

router.use('/auth', require('./auth'));
router.use('/game', require('./game'));
router.use('/api', require('./api'));

module.exports = router;
