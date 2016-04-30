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
		// required:true
	},
	author:{
		type:String
	},
	rating:[{
		user : {
			type: String,
		},
		comment: {
			type: String,
		},
		points:{
			type: Number
		},
		user_id:{
			type:mongoose.Schema.Types.ObjectId
		},
		userPicture:{
			type:String
		}
	}],
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
	like:{
		type:Boolean
	},
	status:{
		type:String,
		// required:true
	},
	description:{
		type:String,
	},
	owner:{type:mongoose.Schema.Types.ObjectId},
	category: Category.categorySchema

};

var schema = new mongoose.Schema(productSchema);
schema.index({ name: 'text' });

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;