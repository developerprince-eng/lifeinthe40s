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
    editArticle(){

    }
    retrieveArticle(){

    }
    retrieveArticles(){

    }
    deleteArticle(){

    }
}

module.exports = ARTICLES;