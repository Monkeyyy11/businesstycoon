var router = require('express').Router();
const ProductModel = require('../../models/product');

router.get('/', (req, res, next) => res.render('index', {
  loggedIn: req.session.passport ? req.session.passport.user.profile : false
}));

router.get('/test', async (req, res, next) => {
  const test = new ProductModel({ id: 'test', title: 'test' });
  test.save((err) => {
    if (err) return console.error(err);
    console.log('saved');
  });
  return res.status(200);
});


module.exports = router;
