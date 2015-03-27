'use strict';

var main = require('../app');
var db = main.db;
var ObjectID = require('mongodb').ObjectID;


function songs(req, res) {
	console.log("Finding all songs");
    db.collection('songs').find().toArray(function (err, docs) {
      res.send(docs);
    });
}

function insert(req, res) {
	console.log("Creating new song: " + req.body);
  	db.collection('songs').insert(req.body, function(err, records) {
		if (err) throw err;
		res.sendStatus(200);
	});
}

function erase(req, res) {
	console.log("Erasing song with id: " + req.params.id);
	db.collection('songs').remove({ _id: ObjectID(req.params.id) }, function(err, result) {
		if(err) { throw err; }
		res.sendStatus(200);
	});
}

function update(req, res) {
	console.log("Updating song with id: " + req.params.id);
	console.log("New data: " + req.body);
	db.collection('songs').update({ _id: ObjectID(req.params.id)}, req.body, function(err, result) {
		if(err) { throw err; }
		res.sendStatus(200);
	});
}

function find(req, res) {
	console.log("Finding song with id: " + req.params.id);
	db.collection('songs').findOne({ _id: ObjectID(req.params.id)}, function(err, result) {
		if(err) { throw err; }
		res.status(200).json(result);
	});
}

// Routes

main.app.get('/songs/:id', find);

main.app.get('/songs', songs);

main.app.post('/songs', insert);

main.app.delete('/songs/:id', erase);

main.app.put('/songs/:id', update)