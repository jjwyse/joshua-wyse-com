var https = require('https');

exports.list = function (githubToken) {
   return function(request, response) {

      console.log('token: ' + githubToken);

      var options = {
         host: 'api.github.com',
         path: '/users/jjwyse/repos',
         headers: {
            'User-Agent:': 'joshua-wyse-com',
            'Authorization': 'token ' + githubToken
         }
      };

      https.get(options, function(res) {
         console.log("status code:" + res.statusCode);

         var responseString = ""

         res.on('data', function(data){
            responseString += data;
         });

         res.on('end', function(){
            var json = JSON.parse(responseString);
            response.send(json);
         });
      }).on('error', function(error){
         console.error(error);
         response.send("Error");
      });
   };
};
