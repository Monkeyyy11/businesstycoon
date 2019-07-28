var router = require('express').Router();
const ProductModel = require('../../models/product');

router.get('/', (req, res, next) => res.render('index', {
  loggedIn: req.session.passport ? req.session.passport.user.profile : false
}));

module.exports = router;
