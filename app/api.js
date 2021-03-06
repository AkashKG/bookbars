var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
	var api = express.Router();
	api.use(bodyparser.json());
	api.get('/category/id/:id', wagner.invoke(function(Category) {
																	
		return function(req, res) {
			Category.findOne({
				_id : req.params.id
			}, function(error, category) {
				if (error) {
					return res.status(status.INTERNAL_SERVER_ERROR).json({
						error : error.toString()
					});
				}
				if (!category) {
					return res.status(status.NOT_FOUND).json({
						error : 'Not found'
					});
				}
				res.json({
					category : category
				});
			});
		};
	}));
	api.get('/user/id/:id', wagner.invoke(function(User) {
		return function(req, res) {
			User.findOne({
				_id : req.params.id
			},{data:0, "profile.booksTradedByOwner":0, dataLocal:0, "profile.bookRequests":0}, function(error, user) {
				if (error) {
					return res.status(status.INTERNAL_SERVER_ERROR).json({
						error : error.toString()
					});
				}
				if (!user) {
					return res.status(status.NOT_FOUND).json({
						error : 'Not found'
					});
				}
				res.json({
					user : user
				});
			});
		};
	}));
	api.get('/product/text/:query', wagner.invoke(function(Product) {// done
		return function(req, res) {
			Product.find({
				$text : {
					$search : req.params.query
				}
			}, {
				score : {
					$meta : 'textScore'
				}
			}).sort({
				score : {
					$meta : 'textScore'
				}
			}).limit(10).exec(handleMany.bind(null, 'products', res));
		};
	}));
	api.post('/user/update/addbook/:id/:bid', wagner.invoke(function(User, Product){
		return function(req,res){
			console.log(req.params.id);
			var book={};
			Product.findById(req.params.bid, function(err,res){
				book=res;
				if(book){
					User.findById(req.params.id, function(err,post){
						console.log(post);
						post.profile.booksOwner.push(book);
						post.save(function(err){
							if(!err) console.log('Book was added!');
							else console.log('Book wasn\'t added');
						})
					});
				}
			})
		};
	}));
	api.delete('/user/update/deletebook/:id/:bid', wagner.invoke(function(User){
		return function(req,res){
			User.update({_id:req.params.id},{$pull:{'profile.booksOwner':{_id:req.params.bid}}}, function(err,data){
				if(err){
					console.log(err);
					return res.status(500).json({'error' : "FUCKED UP"});
				}
				console.log(data);
				res.json(data);
			});
		};
	}));
	api.delete('/product/deletecomment/:bid/:cid', wagner.invoke(function(Product) {// error
		return function(req, res) {
			console.log(req.params.bid)
			Product.update(
					  { _id: req.params.bid },
					  { $pull: { 'rating': {_id : req.params.cid} } }, function(err, data){
						  if(err){
							  console.log(err);
							  return res.status(500).json({'error' : "FUCKED UP"});
						  }
						  console.log(data);
						  res.json(data);
					  }
					);
		};
	}));
	
	api.post('/user/update/requestBook/:id/:bid/:oid', wagner.invoke(function(User, Product){
		return function(req,res){
			var book={};
			Product.findById(req.params.bid, function(err,res){
				book=res;
			});
			console.log(req.params.id);
			User.findById(req.params.id, function(err,post){
				console.log(post);
				post.profile.booksTradedByOwner.push(book);
				post.save(function(err){
					if(!err) console.log('Book was added to request!');
					else console.log('Book wasn\'t added' + err);
				})
			});
			User.findById(req.params.oid, function(err,post){
				post.profile.bookRequests.push({_id:req.params.bid, owner_id:req.params.id});
				post.save(function(err){
					if(!err) console.log('Book was added to request!');
					else console.log('Book wasn\'t added' + err);
				})
			});
		};
	}));
	api.delete('/user/update/deleterequest/:id/:bid', wagner.invoke(function(User){
		return function(req,res){
			User.update({_id:req.params.id},{$pull:{'profile.booksTradedByOwner':{_id:req.params.bid}}}, function(err,data){
				if(err){
					console.log(err);
					return res.status(500).json({'error' : "FUCKED UP"});
				}
				console.log(data);
				res.json(data);
			});
		};
	}));
	
	
	api.post('/product/addcomment/:id', wagner.invoke(function(Product) {// done
		return function(req, res) {
			Product.findById(req.params.id, function(err,post){
				console.log(req.body.user_id);
				post.rating.push({user:req.body.user, comment:req.body.comment,points:req.body.points, user_id:req.body.user_id, userPicture: req.body.picture});
				post.save(function (err) {
					  if (!err) console.log('Success!');
					  else console.log('What The Fuck');
				});
			});
			Product.findOne({
				_id : req.params.id
			}, handleOne.bind(null, 'product', res));
		};
	}));
	api.post('/product/addbook', wagner.invoke(function(Product) {// done
		/*
		 * return function(req, res){ var product = new Product({
		 * name:req.body.bookname }); product.save(function(err,res){ if(err) {
		 * console.log(err); res.send(err); } else { res.send(err); } });}
		 */
			return function(req, res) {
			Product.create({
				name : req.body.bookname,
				author:req.body.author,
				picture: req.body.picture,
				date : req.body.date,
				isbn : req.body.isbn,
				edition: req.body.edition,
				publisher: req.body.publisher,
				description : req.body.description,
				owner : req.body.owner,
				like:req.body.like,
				category:{
					_id: req.body.parent,
					parent:req.body.parent,
					ancestors:req.body.ancestor
				},
				done : false
			}, function(err, product) {
				if (err)
					res.send(err);
				Product.find(function(err, product) {
					if (err)
						res.send(err)
					res.json(product);
				});
			});
		}
	}));
	api.delete('/product/delete/:book_id', wagner.invoke(function(Product){// done
		return function(req, res){
			Product.remove({
				_id:req.params.book_id
			}, function(err, book){
				if(err)
					res.send(err);
				Product.find(function(err, product) {
					if (err)
						res.send(err)
					res.json(product);
				});
			});
		}
	}));
	
	api.get('/category/parent/:id', wagner.invoke(function(Category) {
		return function(req, res) {
			Category.find({
				parent : req.params.id
			}).sort({
				_id : 1
			}).exec(function(error, categories) {
				if (error) {
					return res.status(status.INTERNAL_SERVER_ERROR).json({
						error : error.toString()
					});
				}
				res.json({
					categories : categories
				});
			});
		};
	}));

	/* Product Api */

	api.get('/product/id/:id', wagner.invoke(function(Product) {// done
		return function(req, res) {
			Product.findOne({
				_id : req.params.id
			}, handleOne.bind(null, 'product', res));
		};
	}));

	api.get('/product/category/:id', wagner.invoke(function(Product) {// Check
		return function(req, res) {
			var sort = {
				name : 1
			};
			Product.find({
				'category.ancestors' : req.params.id
			}).sort(sort).exec(handleMany.bind(null, 'products', res));
		};
	}));
	/*
	 * api.get('/product/category/:email/:id', wagner.invoke(function(Product) {
	 * return function(req, res) { var sort = { name : 1 }; Product.find({
	 * 'category.ancestors' : req.params.id
	 * }).sort(sort).exec(handleMany.bind(null, 'products', res)); }; }));
	 */
	api.get('/product/allcategory', wagner.invoke(function(Product) {// done
		return function(req, res) {
			var sort = {
				name : 1
			};
			Product.find({
			}).sort(sort).exec(handleMany.bind(null, 'products', res));
		};
	}));
	/*
	 * api.get('/product/allcategory/:email', wagner.invoke(function(Product)
	 * {// done return function(req, res) { var sort = { name : 1 };
	 * Product.find({ owner : req.params.email
	 * }).sort(sort).exec(handleMany.bind(null, 'products', res)); }; }));
	 */
	
	/*
	 * api.post('/user/activity/:id', wagner.invoke(function(User){ return
	 * function(req,res){ User.findById(req.params.id,function(err,post){
	 * post.profile.acitivity.push(req.body.activity); post.save(function(err){
	 * if(!err) console.log('The activity was inserted'); else
	 * console.log('WTF?') }) }) } }));
	 */

	/* User Api */

	api.put('/me/cart', wagner.invoke(function(User) {// to be done
		return function(req, res) {
			try {
				var cart = req.body.data.cart;
			} catch (e) {
				return res.status(status.BAD_REQUEST).json({
					error : 'No cart specified!'
				});
			}

			req.user.data.cart = cart;
			req.user.save(function(error, user) {
				if (error) {
					return res.status(status.INTERNAL_SERVER_ERROR).json({
						error : error.toString()
					});
				}
				return res.json({
					user : user
				});
			});
		};
	}));
	
	api.get('/me', isLoggedIn, function(req, res) {// done
		if (!req.user) {
			return res.status(status.UNAUTHORIZED).json({
				error : 'Not logged in'
			});
		}

		req.user.populate({
			path : 'data.cart.product',
			model : 'Product'
		}, handleOne.bind(null, 'user', res));
	});
	
	api.put('/update/:id', wagner.invoke(function(User) {// /done
		return function(req, res) {
			User.findOneAndUpdate({'_id': req.params.id}, {
				$set:{
					'profile.nearestLocality':req.body.nearestLocality,
					'profile.city' : req.body.city,
					'profile.bio' : req.body.bio,
					'profile.pin' : req.body.pin
				}
			}, {new: true}, function(err, doc){
			    if(err){
			        console.log("Something wrong when updating data!");
			    }
			    res.json(doc);
			});
		};
	}));
	api.put('/update/like/:id', wagner.invoke(function(Product){
		return function(req,res){
			Product.findOneAndUpdate({_id:req.params.id},{
				$set:{
					like:true
				}
			},{new:true},function(err,doc){
					if(err){
						console.log("Error");
					}
					res.json(doc);
			});
		}
	}));

	return api;
};
	

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function handleOne(property, res, error, result) {
	if (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error : error.toString()
		});
	}
	if (!result) {
		return res.status(status.NOT_FOUND).json({
			error : 'Not found'
		});
	}

	var json = {};
	json[property] = result;
	res.json(json);
}

function handleMany(property, res, error, result) {
	if (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error : error.toString()
		});
	}

	var json = {};
	json[property] = result;
	res.json(json);
}
