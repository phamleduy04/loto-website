const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).send('Home page!');
});

module.exports = router;
