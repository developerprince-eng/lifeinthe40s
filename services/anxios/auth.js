var axios = require('axios');
var md5 = require('md5');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';
var facebook_token = '';

var google_token = 'AIzaSyDvRfTjNqqfJz9iwz5PrhI-GtOtDklBPK0';

class AUTH{
    constructor(){}
    basicAuth (email, password, callback){
            var hash = md5(password);

            var formData = {
                access_token: matser_key,
                email: email,
                password: hash
            };

            var postUrl = "https://" + formData.email + ':' + formData.password + '@backend-lifeinthe40s.herokuapp.com/auth?access_token=' + formData.access_token;
            axios.post(postUrl)
            .then(function (response){
                if(response){
                    callback(response);
                }
               
            })
            .catch(function (error){
                callback([]);
            });
        }

    registerUser(email, password, callback){
        var hash = md5(password);
        axios.post('https://backend-lifeinthe40s.herokuapp.com/users', {
            email: email,
            password: hash,
            access_token: matser_key
        })
        .then(function (response){
            if(response.status == 201){
                callback(response.data);
            }
            else {
                callback([]);
            }
        })
        .catch(function (error){
            callback([]);
        });
    }
    sendEmail (email, link, callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/password-resets',{
            email: email,
            link: link
        })
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            callback([]);
        });
    }
    sendPassword( token, password, callback){
        var hash = md5(password);
        axios.put('https://backend-lifeinthe40s.herokuapp.com/password-resets/' + token,{
            password: hash
        })
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            callback([]);
        });
    }
    verifyToken(token, callback){
        axios.get('https://backend-lifeinthe40s.herokuapp.com/password-resets/' + token)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            callback([]);
        });
    }
    updatePassword(uid, email, password, upassword, callback){
        var hash = md5(password);
        var hash2 = md5(upassword);
        var formData = {
            access_token: matser_key,
            email: email,
            password: hash
        };
        var postUrl = "https://" + formData.email + ':' + formData.password + '@backend-lifeinthe40s.herokuapp.com/auth?access_token=' + formData.access_token;
        axios.post(postUrl + '/users/' + uid + '/' + hash2)
        .then(function (response){
            if(response.data){
                callback(response.data);
            }
            else {
                callback([]);
            }
        })
        .catch(function (error){
            callback([]);
        });
    }
    updateUser(uid, callback){

    }
}

module.exports = AUTH;