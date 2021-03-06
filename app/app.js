'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');

/**
 * Mongodb 
 */
var Server = mongodb.Server;
var Db = mongodb.Db;
var server = new Server('ds029117.mongolab.com', 29117, {auto_reconnect: true});
var db = new Db('testbobby', server);

/**
 * login to mongolab database 
 */
db.open(function (err, client) {
  client.authenticate(process.env.DB_USER, process.env.DB_PASS, function (err, success) {
    console.log('authenticated!');
  });
});

/**
 * Experess app instantiation
 */
var  app = express();
app.use(bodyParser.json());
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

/**
 * port switch local/production environment
 */
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server running at: ' + port);

/**
 * Make the app available to the outside
 */
module.exports = {
  app: app,
  db: db
}
