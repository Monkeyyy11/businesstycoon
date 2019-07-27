var router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json(require('../../public/json/cities.json'));
});

module.exports = router;
