var unirest = require('unirest');

exports.index = function (req, res) {
   res.render('index', { title: 'Joshua Wyse' });
};

exports.sendMessage = function(token, userSecret) {
  return function(req, res) {
    console.log(req.body);
    unirest.post('https://api.cloud-elements.com/elements/api-v2/hubs/messaging/messages')
      .headers({ 'Content-Type': 'application/json' }, {'Authorization': 'Element ' + token + ', User ' + userSecret})
      .end(function (response) {
        console.log(response.body);
        res.send(response.body);
      });
  };
};
