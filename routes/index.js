var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');
var ARTICLES = require('../services/anxios/articles');

var articles = new ARTICLES();
var auth = new AUTH(); 
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.token) {
    console.log(req.session.token);
    res.redirect('/articles');
  }
  articles.retrieveArticles(function(response){
    var articles = response;
    res.render('index', {articles : articles});
  });
});

router.post('/users', function(req, res, next){

  var email = req.body.email;
  var password = req.body.password;

  auth.basicAuth(email, password, function(response){

    if(response.data.token == null){
      res.redirect('/users');
    }
    req.session.token = response.data.token;

    console.log(req.session.token);
    console.log(response.token);
    
    res.redirect('/articles');
  });
});

router.post('articles', function(req, res, next){
  if(req.session.token) {
    res.render('article');
  }
  res.redirect('/users');
  
});

router.get('/logout', function(req, res, next){
  req.session.destroy(function(error){
    if(error){
      res.negotiate(error);
    }
    res.redirect('/users');
  });
});

router.get('/articles', function(req, res, next){
  if(req.session.token) {
    res.render('article');
  }
  
});

router.get('/articles/create', function(req, res, next){
  if(req.session.token) {
    res.render('create_article');
  }
  res.redirect('/users');
});

router.post('/articles/create', function(req, res, next){

    var name = req.body.article_title;
    var header = req.body.header_content;
    var imgurl = req.body.imgurl;
    var content = req.body.article_content;
    articles.createArticle(name, header, content, imgurl, function(response){
      console.log(response.data);
      res.redirect('/articles');
    });
  

});
module.exports = router;
