var http = require('http'),
   express = require('express'),
   config = require('./config'),
   monk = require('monk');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main'});
var routes = require('./routes');

var db = monk(config.mongodbendpoint, {
   username: config.mongodbusername,
   password: config.mongodbpassword
});

var app = express();

app.set('port', process.env.PORT || 2997);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.favicon("./public/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/api/messages', routes.sendMessage(config.cetoken, config.ceusersecret));

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
