'use strict';

var main = require('../app');
var db = main.db;
var ObjectID = require('mongodb').ObjectID;


function songs(req, res) {
    db.collection('songs').find().toArray(function (err, docs) {
      res.send(docs);
    });
}

function insert(req, res) {
	console.log(req.body);
  	db.collection('songs').insert(req.body, function(err, records) {
		if (err) throw err;
		res.sendStatus(200);
	});
}

function erase(req, res) {
	console.log(req.params.id);
	db.collection('songs').remove({ _id: ObjectID(req.params.id) }, function(err, result) {
		if(err) { throw err; }
		res.sendStatus(200);
	});
}

function update(req, res) {
	console.log(req.params.id);
	db.collection('songs').update({ _id: ObjectID(req.params.id)}, req.body, function(err, result) {
		if(err) { throw err; }
		res.sendStatus(200);
	});
}

// Routes

main.app.get('/songs', songs);

main.app.post('/songs', insert);

main.app.delete('/songs/:id', erase);

main.app.put('/songs/:id', update)