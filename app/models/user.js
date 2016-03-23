// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// module.exports allows us to pass this to other files when it is called
var userSchema =  {
	profile:{
		username:{
			type:String,
			/*required:true*/
			lowercase:true
		},
		picture:{
			type:String,
			/*required:true*/
		},
		firstName:{
			type:String,
			reqired:true
		},
		lastName:{
			type:String,
			/*required:true*/
		},
		nearestLocality:{
			type:String,
			/*required:true*/
		},
		city:{
			type:String,
			/*required:true*/
		},
		gender:{
			type:String,
		},
		pin:{
			type:String,
			/*required:true*/
		},
		bio:{
			type:String,
		},
		ativity:[{type:String}],
		booksOwnwer:[{type:String}],
		booksTraded:[{type:String}]
	},
	
	data:{
		oauth:{type:String,/*required:true*/},
		email:{type:String, /*required:true*/},
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
	},
	dataLocal:{
		email:{type:String, /*required:true*/},
		password:{type:String, /*required:true*/}
	}
};



module.exports = new mongoose.Schema(userSchema);
module.exports.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.dataLocal.password);
};
module.exports.userSchema = userSchema;

