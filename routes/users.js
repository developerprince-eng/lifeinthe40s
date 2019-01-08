var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');


var auth = new AUTH();

//--------------------- Users ---------------------------
router.get('/', function(req, res, next){
  res.render('users/auth');
});

router.post('/', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  auth.basicAuth(email, password, function(response){
    if(response.data.token == null){
      res.redirect('/');
    }
    if(response == null){
      console.log(response);
      authfail = true;
      res.render('users/auth');
    }
    req.session.token = response.data.token;   
    console.log(req.session.token);
    res.redirect('/');
  });
});

router.post('/register', function(resq, res, next){

  req.check('email', 'Invalid Email Address').isEmail().notEmpty();
  req.check('password', 'Invalid Password').isLength({min: 8}).equal(req.body.password2).notEmpty();
  req.check('password2', 'Confirm Password is Empty').notEmpty();
  var email = req.body.email;
  var password = req.body.password;

  var errors = req.ValidationErrors();
  if(errors){
    req.session.errors = errors;
  }
  auth.registerUser(email, password, function(response){
    res.redirect('/users');
  });
});

router.get('/register', function(req, res, next){
  res.render('users/register');
});

router.get('/logout', function(req, res, next){
  req.session.destroy(function(error){
    if(error){
      res.negotiate(error);
    }
    res.redirect('/users');
  });
});

module.exports = router;
