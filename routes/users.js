var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');


var auth = new AUTH();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('auth');

});


/* LOG IN users listing. */
// router.get('/register', function(req, res, next) {
//   res.render('register');
// });

module.exports = router;
