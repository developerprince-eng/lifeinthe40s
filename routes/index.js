var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');
var ARTICLES = require('../services/anxios/articles');

var articles = new ARTICLES();
var auth = new AUTH(); 

//--------------------- Main Pages ----------------------
router.get('/', function(req, res, next) {
  
  if(req.session.token) {
    console.log(req.session.token);
    articles.retrieveArticles(function(response){
      var articlez = response;
      res.render('index', {articles: articlez});
    });
  }
  articles.retrieveArticles(function(response){
    var articles = response;
    res.render('index', {articles : articles});
  });
});

router.get('/about', function(req, res, next){

});

router.get('/contacts', function(req, res, next){

});

module.exports = router;
