var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');

var auth = new AUTH(); 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res, next){

  var email = req.body.email;
  var password = req.body.password;

  console.log(email);
  console.log(password);
  auth.basicAuth(email, password, function(response){
    console.log(response);
  });
});



module.exports = router;
