var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');


var auth = new AUTH();

router.get('/', function(req, res, next) {
  res.render('auth', {authfail: false});

});

module.exports = router;
