// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
// config files

var productSchema = require('./app/models/Product');

var db = require('./config/db');

var port = process.env.PORT || 8181; // set our port
 mongoose.connect(db.url); // connect to our mongoDB database (commented out
							// after you enter in your own credentials)

 var Product = mongoose.model('Product', productSchema);

 var p = new Product({
   name: 'test',
   picture: 'picture of the thing',
   rating:'5',
   status:'Booked',
   owner:{
	   profile:{
		   username:'Akash'
	   }
   },
   category:{
	   _id:'101',
	   parent:'xyz',
	   ancestors:'abc'
   }
 });
 console.log(p.name + " " + p.picture + " " + p.rating + p.category._id + p.category.parent + p.category.ancestors +'\n'+p.owner.profile.username );
 
// get all data/stuff of the body (POST) parameters
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
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
