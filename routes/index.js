var unirest = require('unirest');

exports.index = function (req, res) {
   res.render('index', { title: 'Joshua Wyse' });
};

exports.sendMessage = function(token, userSecret, orgSecret, toEmail, isEmailOn) {
  return function(req, res) {
    if (!isEmailOn) {
      res.send(400, {"message": "email is currently disabled.  please feel free to email me directly at " + toEmail});
      return;
    }
    var authHeader = 'User ' + userSecret + ', Organization ' + orgSecret + ', Element ' + token;
    var message = req.body;
    message['to'] = toEmail;
    console.log("Attempting to send message: " + JSON.stringify(message));

    unirest.post('https://api.cloud-elements.com/elements/api-v2/hubs/messaging/messages')
      .headers({'Authorization': authHeader})
      .headers({'Content-Type': 'application/json'})
      .send(JSON.stringify(message))
      .end(function (response) {
        if(response.code != 200) {
          console.log("Failed to send message: " + response.body);
          res.send(502);
          return;
        }
        res.send(200);
      });
  };
};
