var router = require('express').Router();

router.get('/', async (req, res, next) => res.render('game/index'));

router.use('/products', require('./products'));
router.use('/cities', require('./cities'));

module.exports = router;
