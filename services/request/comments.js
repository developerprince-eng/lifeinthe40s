var request = require('request');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';




class COMMENTS{
    createComment( articel_id,  comment, likes, dislikes){ 
        
        
        var formData = {
            access_token: matser_key,
            articel_id: articel_id,
            comment: comment,
            likes: likes,
            dislikes: dislikes
          };
        var postCom = 'https://backend-lifeinthe40s.herokuapp.com/comments';
        request.post({url: postCom, formData: formData}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
       
    }

    retriveComments(){

        request.get({url:'https://backend-lifeinthe40s.herokuapp.com/comments'}, function optionalCallback(err, httpResponse, body){
            if(err){
                return console.error('Register User Failed', err);
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    retriveComment(id){
        var getArt = 'https://backend-lifeinthe40s.herokuapp.com/comments/:' + id;
        request.get({url: getArt}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    updateComment(id, articel_id,  comment, likes, dislikes){
        var formData = {
            access_token: matser_key,
            articel_id: articel_id,
            comment: comment,
            likes: likes,
            dislikes: dislikes
          };
          var updateCom = 'https://backend-lifeinthe40s.herokuapp.com/comments/:' + id;
          request.post({url: updateCom, formData: formData}, function optionalCallback(err, httpResponse, body){
              if(err){
                  return err;
              }
              var res = JSON.parse(body);
              return res;
          });
    }

    deleteComment(id){
        var deleteCom = 'https://backend-lifeinthe40s.herokuapp.com/comments/:' + id;
        request.delete({url: deleteCom}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        })
    }
}


module.exports = COMMENTS;