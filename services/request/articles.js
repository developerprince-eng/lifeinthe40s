var request = require('request');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';




class ARTICLES{
    createArticle(name , header_content, content, imgUrl){ 
        
        
        var formData = {
            access_token: matser_key,
            name: name,
            header_content: header_content,
            content: content,
            imgUrl: imgUrl
          };
        var postArt = 'https://backend-lifeinthe40s.herokuapp.com/articles';
        request.post({url: postArt, formData: formData}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
       
    }

    retriveArticles(){

        request.get({url:'https://backend-lifeinthe40s.herokuapp.com/articles'}, function optionalCallback(err, httpResponse, body){
            if(err){
                return console.error('Register User Failed', err);
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    retriveArticle(id){
        var getArt = 'https://backend-lifeinthe40s.herokuapp.com/articles/:' + id;
        request.get({url: getArt}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    updateArticle(id, name , header_content, content, imgUrl){
        var formData = {
            access_token: matser_key,
            name: name,
            header_content: header_content,
            content: content,
            imgUrl: imgUrl
          };
          var updateArt = 'https://backend-lifeinthe40s.herokuapp.com/articles/:' + id;
          request.post({url: updateArt, formData: formData}, function optionalCallback(err, httpResponse, body){
              if(err){
                  return err;
              }
              var res = JSON.parse(body);
              return res;
          });
    }

    deleteArticle(id){
        var deleteArt = 'https://backend-lifeinthe40s.herokuapp.com/articles/:' + id;
        request.delete({url: deleteArt}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        })
    }
}


module.exports = ARTICLES;