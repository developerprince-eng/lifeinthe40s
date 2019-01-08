var request = require('request');
var matser_key = 'lDy8Wk6ysy5S3dakTL9fU89s2UF9Tk62';




class DESTINATION{
    createDestination(name, location, imgUrl, description){ 
        
        
        var formData = {
            access_token: matser_key,
            name: name,
            location: location,
            imgUrl: imgUrl,
            description: description
          };
        var postDest = 'https://backend-lifeinthe40s.herokuapp.com/destinations';
        request.post({url: postDest, formData: formData}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
       
    }

    retriveDestinations(){

        request.get({url:'https://backend-lifeinthe40s.herokuapp.com/destinations'}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        });
    }

    updateDestination(name, location, imgUrl, description){
        var formData = {
            access_token: matser_key,
            name: name,
            location: location,
            imgUrl: imgUrl,
            description: description
          };
          var updateDest = 'https://backend-lifeinthe40s.herokuapp.com/destinations/:' + id;
          request.post({url: updateDest, formData: formData}, function optionalCallback(err, httpResponse, body){
              if(err){
                  return err;
              }
              var res = JSON.parse(body);
              return res;
          });
    }

    deleteDestination(id){
        var deleteDest = 'https://backend-lifeinthe40s.herokuapp.com/destinations/:' + id;
        request.delete({url: deleteDest}, function optionalCallback(err, httpResponse, body){
            if(err){
                return err;
            }
            var res = JSON.parse(body);
            return res;
        })
    }
}


module.exports = DESTINATION;