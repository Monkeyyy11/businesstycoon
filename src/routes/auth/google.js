var router = require('express').Router();
const passport = require('passport');
const auth = require('../../middleware/auth');
const UserModel = require('../../models/user');

auth(passport);
router.use(passport.initialize());

router.get('/', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }), async (req, res) => {

    await UserModel.findOne({ googleId: req.session.passport.user.profile.id }).exec((err, result) => {
      if (err || !result) {
        const userObject = {
          googleId: req.session.passport.user.profile.id,
          id: 70,
          username: req.session.passport.user.profile.displayName,
          avatar: req.session.passport.user.profile._json.picture
        };

        const user = new UserModel(userObject);
        user.save((err) => {
          if (err) return console.error(err);
          console.log(`Saved new user ${req.session.passport.user.profile.displayName}`);
        });
      }

      req.session.token = req.user.token;
      res.redirect('/game');
    });
  });

module.exports = router;
