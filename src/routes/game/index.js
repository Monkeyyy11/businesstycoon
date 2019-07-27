var router = require('express').Router();

router.use('/products', require('./products'));
router.use('/cities', require('./cities'));

module.exports = router;
