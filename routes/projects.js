var https = require('https');

exports.list = function(req, res) {
   res.send('todo');
}

exports.apiList = function (req, res) {

   var options = {
      host: 'api.github.com',
      path: '/users/jjwyse/repos',
      headers: {'User-Agent:': 'Personal Website'}
   };

   https.get(options, function(res) {
      console.log("status code:" + res.statusCode);
      console.log("headers:" + res.headers);

      res.on('data', function(d){
         process.stdout.write(d);
      });
   }).on('error', function(e){
      console.error(e);
   });
};
