var axios = require('axios');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';
var facebook_token = '';

var google_token = 'AIzaSyDvRfTjNqqfJz9iwz5PrhI-GtOtDklBPK0';

class AUTH{
    constructor(){}
    basicAuth (email, password, callback){

            var formData = {
                access_token: matser_key,
                email: email,
                password: password
            };

            var postUrl = "https://" + formData.email + ':' + formData.password + '@backend-lifeinthe40s.herokuapp.com/auth?access_token=' + formData.access_token;
            axios.post(postUrl)
            .then(function (response){
                callback(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
        }

    registerUser(email, password, callback){
        axios.post('https://backend-lifeinthe40s.herokuapp.com/users', {
            email: email,
            password: password,
            access_token: matser_key
        })
        .then(function (response){
           callback(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }

}

module.exports = AUTH;