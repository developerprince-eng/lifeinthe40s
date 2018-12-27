var request = require('request');
var md5 = require('md5');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';

var facebook_token = '';

var google_token = '';


class AUTH{
    basicAuth(email , password){ 
        var hash = md5(password);
        
        var formData = {
            // Pass data via Streams
            access_token: matser_key,
            // Pass a simple key-value pair
            email: email,
            // Pass data via Buffers
            password: hash
          };
        var postUrl ="https://" + formData.email + ':' + formData.password + '@backend-lifeinthe40s.herokuapp.com/auth?access_token=' + formData.access_token;
        request.post(postUrl)
        .on('response', function(error, response, body){
            if(!error && response.statusCode == 201){
                var results = JSON.parse(body);
                console.log(results);
                return results;
            }
        });
    }

    registerUser(email, password){
        var hash = md5(password);
        var formData = {
            email: email,
            password: hash,
            access_token: matser_key
        };

        request.post({url:'https://backend-lifeinthe40s.herokuapp.com/users', formData: formData}, function optionalCallback(err, httpResponse, body){
            if(err){
                return console.error('Register User Failed', err);
            }
            var res = JSON.parse(body);
            console.log('Register New User Succesful',res);
        });
    }

    facebookAuth(){
        var formData = {
            access_token: facebook_token
        };
        var fbAuth = 'https://backend-lifeinthe40s.herokuapp.com/auth/facebook';
        request.post({uri: fbAuth, formData: formData }, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    googleAuth(){
        var formData = {
            access_token: google_token
        };
        var gAuth = 'https://backend-lifeinthe40s.herokuapp.com/auth/google';
        request.post({uri: gAuth, formData: formData }, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });

    }

}


module.exports = AUTH;