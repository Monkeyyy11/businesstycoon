var router = require('express').Router();
const ProductModel = require('../../models/product');

router.get('/', async (req, res, next) => {
  const allProductsArray = [];
  await ProductModel.find({}, async (err, products) => {
    if (err) return console.error(err);

    await products.map(product => allProductsArray.push(product));
  });

  return res.render('game/products/index', {
    loggedIn: req.session.passport ? req.session.passport.user.profile : false
  });
});

module.exports = router;
