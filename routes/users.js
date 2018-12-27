var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');
var md5 = require('md5');

var auth = new AUTH();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('auth');

});

router.post('/users', function(req, res, next){

  var email = res.body.email;
  var password = res.body.password;

  var hash = md5(password);
  auth.basicAuth(email, hash , function(response){
    console.log(response);
  });
});

/* LOG IN users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;
