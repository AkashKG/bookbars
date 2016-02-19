var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  if(mongoose.connect('mongodb://localhost:27017/test')){
	console.log("Connected to DB. . .")  
  }
  else
	  console.log("Mongo DB is not active. . .\nPlease open cmd and run C:\ mongod --dbpath C:\data");

  var Category =
    mongoose.model('Category', require('./category'), 'categories');
  var Product =
    mongoose.model('Product', require('./product'), 'products');
  var User =
	    mongoose.model('User', require('./user'), 'users');

	  var models = {
	    Category: Category,
	    Product: Product,
	    User: User
	  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
