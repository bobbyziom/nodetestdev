'use strict';

var main = require('../app');
var db = main.db;

// Route handlers
function status(req, res) {
  	res.send('Server is up');
}

function insert(req, res) {
	console.log(req.body);
  	db.collection('songs').insert(req.body, function(err, records) {
	  if (err) throw err;
	  //console.log("Record added as " + records[0]._id);
	  res.sendStatus(200);
	});
}

function test(req, res) {
	res.send('hej heeej');
}

function allSongs(req, res) {
    db.collection('songs').find().toArray(function (err, docs) {
      res.send(docs);
    });
}

// Routes
main.app.get('/', status);

main.app.get('/yo', test);

main.app.get('/songs', allSongs);

main.app.post('/songs', insert);