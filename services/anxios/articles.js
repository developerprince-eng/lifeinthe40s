var axios = require('axios');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';

class ARTICLES{
    
    constructor(){}
    createArticle(title, hcontent, content, imgurl, likes ,callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/articles',{
            access_token: matser_key,
            name: title,
            header_content: hcontent,
            content: content,
            imgUrl: imgurl,
            likes: likes
        })

        .then(function (response){
            callback(response.rows.data);
        })
        .catch(function (error){
            callback({});
        }); 
    }
    updateComment(uid, id, articleid, content ,callback){
        axios.put('https://backend-lifeinthe40s.herokuapp.com/comments/' + id,{
            access_token: uid,
            article_id: articleid,
            comment: content
        })
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            callback({});
        });
    }
    updateArticle(id, name, hcontent, content ,imgUrl,callback){
        axios.put('https://backend-lifeinthe40s.herokuapp.com/arcticles/' + id,{
            access_token: matser_key,
            name: name,
            header_content: hcontent,
            content: content,
            imgUrl: imgUrl
        })
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            callback({});
        });
    }
    createComment(userid , articleid, comment,  callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/comments',{
            access_token: userid,
            article_id: articleid,
            comment: comment,
        })
        .then(function (response){
            callback(response.rows.data);
        })
        .catch(function (error){
            callback({});
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
            callback({});
        });
    }
    editArticle(){

    }
    retrieveArticle(id, callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/articles/',{id: id})
        .then(function(response){
            if(response){
                callback(response.data.rows);
            }
            else{
                callback({});
            }   
        })
        .catch(function(error){
            callback({});
        });

    }
    retrieveComments(callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/comments')
        .then(function (response){
            if(response){
                callback(response.data.rows);
            }
            else{
                callback({});
            }
        })
        .catch(function (error){
            callback({});
        });

    }
    retrieveArticles(callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/articles')
        .then(function (response){
            if(response){
                callback(response.data.rows);
            }
            else{
                callback({});
            }
        })
        .catch(function (error){
            callback({});
        });

    }
    deleteComment(id, callback){
        axios.delete('https://backend-lifeinthe40s.herokuapp.com/comments',{id: id})
        .then(function(response){
            if(response.data){
                callback(response.data);
            }
        })
        .then(function(error){
            callback({});
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
            callback({});
        });
    }
    likeArticle(callback){
        axios.put()
        .then(function(response){
            if(response.data){
                callback(response.data)
            }
        })
        .catch(function(error){
            callback({});
        });
    }
}

module.exports = ARTICLES;