'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');

// mongo db
var mongodb = require('mongodb'),
  Server = mongodb.Server,
  Db = mongodb.Db,
  server = new Server('ds029117.mongolab.com', 29117, {auto_reconnect: true}),
  db = new Db('testbobby', server);

db.open(function (err, client) {
  client.authenticate('admin', 'admin', function (err, success) {
    console.log('authenticated!');
  });
});

var  app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Loads all routes from controllers folder
 */
function initRoutes() {
  var controllersFolder = path.join(__dirname, 'controllers/');
  fs.readdir(controllersFolder, function(error, files) {
    if (error) {
      console.log('Error loading routes', error.stack);
    }

    files.forEach(function(file) {
      var name = file.replace('.js', '');
      require(controllersFolder + name);
    });
  });
}

initRoutes();

// port switch local/production environment
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server running at: ' + port);

// Make the app available to the outside
module.exports = app;
