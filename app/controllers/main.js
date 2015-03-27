'use strict';

var main = require('../app');

// Route handlers
function status(req, res) {
  	res.send('Server is up!');
}

// Routes
main.app.get('/', status);

