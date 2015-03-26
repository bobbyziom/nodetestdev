'use strict';

var app = require('../app');

// Route handlers
function main(req, res) {
  	res.send('Server is up');
}

function test(req, res) {
	res.send('hej heeej');
}

// Routes
app.get('/', main);

app.get('/yo', test);
