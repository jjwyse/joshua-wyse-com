var express = require('express');

var routes = require('./routes');
var projects = require('./routes/projects');
var runs = require('./routes/runs');
var users = require('./routes/users');

var http = require('http');
var path = require('path');

var monk = require('monk');
var config = require('./config');
var db = monk(config.mongodb);

var app = express();

// all environments
app.set('port', process.env.PORT || 2997);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon("/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/projects', projects.list(config.github))
app.get('/api/runs', runs.list(config.strava))
app.get('/api/users/contact', users.contact(db))
app.get('/api/users/resume', users.resume(db))

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
