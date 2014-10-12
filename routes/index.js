var unirest = require('unirest');

exports.index = function (req, res) {
   res.render('index', { title: 'Joshua Wyse' });
};

exports.sendMessage = function(token, userSecret, orgSecret, toEmail) {
  return function(req, res) {
    var authHeader = 'User ' + userSecret + ', Organization ' + orgSecret + ', Element ' + token;
    var message = req.body;
    message['to'] = toEmail;
    console.log("Attempting to send message: " + JSON.stringify(message));

    console.log(authHeader);
    unirest.post('https://api.cloud-elements.com/elements/api-v2/hubs/messaging/messages')
      .headers({'Authorization': authHeader})
      .headers({'Content-Type': 'application/json'})
      .send(JSON.stringify(message))
      .end(function (response) {
        if(response.code != 200) {
          console.log("Failed to send message: " + response.body);
          res.error({"success": false});
        }else {
          res.send({"success": true});
        }
      });
  };
};
