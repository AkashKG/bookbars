var mongoose = require('mongoose');
var Category = require('./Category');
var User = require('./User');

var productSchema = {
	name:{
		type:String,
		//required:true
	},
	picture:{
		type:String,
		//required:true
	},
	author:{
		type:String
	},
	rating:{
		type:Number
	},
	date:{
		type:String
	},
	isbn:{
		type:String
	},
	edition:{
		type:String
	},
	publisher:{
		type:String
	},
	status:{
		type:String,
		//required:true
	},
	description:{
		type:String,
	},
	owner:User.userSchema.data.email,
	category: Category.categorySchema

};

var schema = new mongoose.Schema(productSchema);
schema.index({ name: 'text' });

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;