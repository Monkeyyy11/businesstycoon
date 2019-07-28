var router = require('express').Router();
const passport = require('passport');
const auth = require('../../middleware/auth');
const UserModel = require('../../models/user');
const ServerModel = require('../../models/server');

auth(passport);
router.use(passport.initialize());

router.get('/', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }), async (req, res) => {
    await UserModel.findOne({ googleId: req.session.passport.user.profile.id }).exec(async (err, result) => {
      if (err || !result) {
        await ServerModel.findOne().exec(async (err, result2) => {
          result2.usercount += 1;

          req.session.passport.user.profile.ingameId = result2.usercount;

          await ServerModel.updateOne({}, result2);

          const userObject = {
            googleId: req.session.passport.user.profile.id,
            id: result2.usercount,
            username: req.session.passport.user.profile.displayName,
            avatar: req.session.passport.user.profile._json.picture
          };

          const user = new UserModel(userObject);
          await user.save((err) => {
            if (err) return console.error(err);
            console.log(`Saved new user ${req.session.passport.user.profile.displayName} (ID: ${result2.usercount})`);
          });
        });
      } else {
        req.session.passport.user.profile.ingameId = result.id;
      }
      req.session.token = req.user.token;
      res.redirect('/game');
    });
  });

module.exports = router;
