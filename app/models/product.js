var mongoose = require('mongoose');
var Category = require('./Category');
var User = require('./User');

var productSchema = {
	name:{
		type:String,
		required:true
	},
	picture:{
		type:String,
		required:true
	},
	rating:{
		type:Number
	},
	status:{
		type:String,
		required:true
	},
	owner:User.userSchema,
	category: Category.categorySchema

};

var schema = new mongoose.Schema(productSchema);
schema.index({ name: 'text' });

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;