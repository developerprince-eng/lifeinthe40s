var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('comment');
});

/* LOG IN users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;
