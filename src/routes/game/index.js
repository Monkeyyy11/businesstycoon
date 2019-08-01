var router = require('express').Router();
const checkLogIn = require('../../helpers/checkLogIn');

router.get('/', async (req, res, next) => {
  const checkLogin = checkLogIn(req, res);
  if (!checkLogin) return res.redirect('/error');

  return res.render('game/index', {
    user: checkLogin
  });
});

router.use('/products', require('./products'));
router.use('/cities', require('./cities'));

module.exports = router;
