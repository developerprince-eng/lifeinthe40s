var express = require('express');
var router = express.Router();
var ARTICLES = require('../services/anxios/articles');

var articles = new ARTICLES();
//-------------- Artcicles ----------------------------
router.get('/', function(req, res, next){
    if(req.session.token) {
        res.render('articles/article');
    }
    res.redirect('/users');
});

router.get('/create', function(req, res, next){
    res.render('articles/create_article');
});

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    var article;
    articles.retrieveArticle(id, function(response){
        console.log(response);
        article = response;
        res.render('articles/single', {articles: article, id: id});
    });
});

router.post('/comments', function(req, res, next){
    var uid = req.session.token;
    var comment = req.body.comment;

articles.createComment(uid, comment, function(response){
    console.log(response.data);
    });
});

router.post('/create', function(req, res, next){
    var name = req.body.article_title;
    var header = req.body.header_content;
    var imgurl = req.body.imgurl;
    var content = req.body.article_content;
    articles.createArticle(name, header, content, imgurl, null, function(response){
        console.log(response.data);
        res.redirect('/');
    });
});

router.post('/update', function(req, res, next){
    var articelID = req.params.id;
    var name = req.body.article_title;
    var header = req.body.header_content;
    var imgurl = req.body.imgurl;
    var content = req.body.article_content;
    articles.updateArticle(articelID, name, header, content, imgurl, function(response){
        console.log(response);
        res.redirect('/');
    });
});

router.put('/edit', function(req, res, next){
    var name = req.body.article_title;
    var header = req.body.header_content;
    var imgurl = req.body.imgurl;
    var content = req.body.article_content;
    articles.editArticle(name, header, content, imgurl, null, function(response){
        console.log(response.data);
        res.redirect('/');
    });
});

router.delete('/delete', function(req, res, next){
    var articelID = req.body.id;
    articles.deleteArticle(articelID, function(response){
        console.log(response);
        res.redirect('/');
    });
});
  

module.exports = router;
