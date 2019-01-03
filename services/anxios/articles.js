var axios = require('axios');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';

class ARTICLES{
    constructor(){}
    createArticle(title, hcontent, content, imgurl, callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/articles',{
            access_token: matser_key,
            name: title,
            header_content: hcontent,
            content: content,
            imgUrl: imgurl
        })
        .then(function (response){
            callback(response);
        })
        .catch(function (error){
            console.log(error);
        }); 
    }
    createComment(userid , articleid, comment,  callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/comments',{
            access_token: userid,
            article_id: articleid,
            comment: comment,
        })
        .then(function (response){
            callback(response);
        })
        .catch(function (error){
            console.log(error);
        }); 
    }
    searchArticle(q, callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/articles/', {q: q})
        .then(function(response){
            if(response.data){
                callback(response.data);
            }
            else{
                callback({});
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
    editArticle(){

    }
    retrieveArticle(id, callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/articles/',{id: id})
        .then(function(response){
            if(response.data.rows){
                callback(response.data.rows);
            }
            else{
                callback({});
            }   
        })
        .catch(function(error){
            console.log(error);
        });

    }
    retrieveArticles(callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/articles')
        .then(function (response){
            if(response.data.rows){
                callback(response.data.rows);
            }
            else{
                callback({});
            }
        })
        .catch(function (error){
            console.log(error);
        });

    }
    deleteArticle(id, callback){
        axios.delete('https://backend-lifeinthe40s.herokuapp.com/articles',{id: id})
        .then(function(response){
            if(response.data){
                callback(response.data);
            }
        })
        .then(function(error){
            console.log(error);
        });
    }
}

module.exports = ARTICLES;