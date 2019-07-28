var router = require('express').Router();
const AdvertisementModel = require('../../../models/advertisement');
const UserModel = require('../../../models/user');

router.post('/sendadvertisement', (req, res) => {
  AdvertisementModel.findOne({ idOfUser: req.session.passport.user.profile.ingameId }).exec((err, result) => {
    if (err || !result) {
      const advertisementObject = {
        idOfUser: req.session.passport.user.profile.ingameId,
        publishedDate: Date.now()
      };
      const newAdvertisement = new AdvertisementModel(advertisementObject);
      newAdvertisement.save((err) => {
        if (err) return console.error(err);
        console.log('Saved new advertisement');
      });
    } else {
        res.status(201).redirect('/error');
    }
  });
  return res.redirect('/game');
});

module.exports = router;
