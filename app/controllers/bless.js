'use strict';

var main = require('../app');
var db = main.db;
var ObjectID = require('mongodb').ObjectID;

function return_blessed(req, res) {

	console.log("Finding all blessed devices");
    db.collection('blessed').find().toArray(function (err, docs) {
      res.send(docs);
    });

}

function return_blinked(req, res) {

	console.log("Finding all blinked devices");
    db.collection('blinkup').find().toArray(function (err, docs) {
      res.send(docs);
    });
	
}

function return_tested(req, res) {

	console.log("Finding all tested devices");
    db.collection('testresults').find().toArray(function (err, docs) {
      res.send(docs);
    });

}

function bless(req, res) {

	db.collection('blessed').insert(req.body, function(err, records) {
		if (err) throw err;
		res.sendStatus(200);
	});

}

function blinkup(req, res) {

	db.collection('blinkup').insert(req.body, function(err, records) {
		if (err) throw err;
		res.sendStatus(200);
	});

}

function test(req, res) {

	db.collection('testresults').insert(req.body, function(err, records) {
		if (err) throw err;
		res.sendStatus(200);
	});

}

main.app.get('/bless', return_blessed);

main.app.get('/blinkup', return_blinked);

main.app.get('/test', return_tested);

main.app.post('/bless', bless);

main.app.post('/blinkup', blinkup);

main.app.post('/test', test);