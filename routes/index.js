exports.index = function (req, res) {
   res.render('index', { title: 'Joshua Wyse' });
};

exports.sendMessage = function(req, res) {
  res.send({"success": true});
}
