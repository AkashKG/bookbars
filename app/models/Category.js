// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Category', {
	_id : {
		type : String
	},
	parent : {
		type : String,
		ref : 'Category'
	},
	ancestors : [ {
		type : String,
		ref : 'Category'
	} ]
});
