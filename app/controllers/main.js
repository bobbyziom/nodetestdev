'use strict';

var main = require('../app');

// Route handlers
function status(req, res) {
	console.log("Server is up!");
  	res.status(200).send({ msg: 'Server is up!' });
}

// Routes
main.app.get('/', status);

