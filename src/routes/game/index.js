var router = require('express').Router();
const checkLogIn = require('../../helpers/checkLogIn');

router.get('/', async (req, res, next) => {
  return res.render('game/index', {
    user: checkLogIn(req, res)
  });
});

router.use('/products', require('./products'));
router.use('/cities', require('./cities'));

module.exports = router;
