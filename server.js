// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var wagner = require('wagner-core');

require('./app/models/models.js')(wagner);
app.use('/api/v1', require('./app/api.js')(wagner));


var port = process.env.PORT || 8181; // set our port
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse
																// application/vnd.api+json
																// as json
app.use(bodyParser.urlencoded({ extended: true })); // parse
													// application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the
													// X-HTTP-Method-Override
													// header in the request.
													// simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location
												// /public/img will be /img for
												// users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Goto port ' + port + '. . .'); 
exports = module.exports = app; 						// expose app
