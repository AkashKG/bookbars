// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
var userSchema =  {
	profile:{
		username:{
			type:String,
			required:true,
			lowercase:true
		},
		picture:{
			type:String,
			required:true
		},
		firstName:{
			type:String,
			reqired:true
		},
		lastName:{
			type:String,
			required:true
		},
		nearestLocality:{
			type:String,
			required:true
		},
		city:{
			type:String,
			required:true
		},
		
		pin:{
			type:String,
			required:true
		},
		booksOwnwer:[{type:String}],
		booksTraded:[{type:String}]
	},
	data:{
		oauth:{type:String,required:true},
		email:{type:String, required:true},
		cart:[{
			product:{
				type:mongoose.Schema.Types.ObjectId
			},
			quantity:{
				type:Number,
				default:1,
				max:3,
				min:1
			}	
		}]
	}
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;