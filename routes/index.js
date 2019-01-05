var express = require('express');
var router = express.Router();
var AUTH = require('../services/anxios/auth');
var ARTICLES = require('../services/anxios/articles');

var articles = new ARTICLES();
var auth = new AUTH(); 

router.get('/', function(req, res, next) {
  
  if(req.session.token) {
    console.log(req.session.token);
    articles.retrieveArticles(function(response){
      var articlez = response;
      res.render('index', {articles: articlez, token: req.session.token});
    });
  }
  articles.retrieveArticles(function(response){
    var articles = response;
    res.render('index', {articles : articles, token: null});
  });
});

router.post('/users', function(req, res, next){

  var email = req.body.email;
  var password = req.body.password;

  auth.basicAuth(email, password, function(response){

    if(response.data.token == null){
      res.redirect('/');
    }
    if(response == null){
      var authfail = true;
      res.render('auth', {authfail: authfail});
    }
    req.session.token = response.data.token; 
    
    console.log(req.session.token);
    res.redirect('/');
  });
});

router.post('/users/register', function(resq, res, next){
  var email = req.body.email;
  var password = req.body.password;

  auth.registerUser(email, password, function(response){
    res.redirect('/users');
  });
});

router.get('/users/register', function(req, res, next){
  res.render('register');
});
router.get('/articles', function(req, res, next){
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

router.get('/articles/:id', function(req, res, next){
    var id = req.params.id;
    var article;
    articles.retrieveArticle(id, function(response){
      console.log(response);
      article = response;
      res.render('single', {articles: article, id: id});
    });
});

router.get('/articles/create', function(req, res, next){
    res.render('create_article');
});

router.post('/articles/comments', function(req, res, next){
  var uid = req.session.token;
  var comment = req.body.comment;

  articles.createComment(uid, comment, function(response){
  console.log(response.data);
  });
});
router.post('/articles/create', function(req, res, next){

    var name = req.body.article_title;
    var header = req.body.header_content;
    var imgurl = req.body.imgurl;
    var content = req.body.article_content;
    articles.createArticle(name, header, content, imgurl, null, function(response){
      console.log(response.data);
      res.redirect('/');
    });

router.put('/articles/edit', function(req, res, next){
  var name = req.body.article_title;
  var header = req.body.header_content;
  var imgurl = req.body.imgurl;
  var content = req.body.article_content;
  articles.editArticle(name, header, content, imgurl, null, function(response){
    console.log(response.data);
    res.redirect('/');
  });
});

});
module.exports = router;
