/**
 * Configuring passport-auth0
 */
function setupAuth(User, app) {
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;
	var LocalStrategy = require('passport-local').Strategy;

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id : id
		}).exec(done);
	});

	passport.use('local-signup', new LocalStrategy({
		passReqToCallback : true
	}, function(req, username, password, done) {
		var newUser = new User();

		newUser.dataLocal.username = username;
		newUser.dataLocal.password = bcrypt.hashSync(password, 8);

		newUser.save(function(err) {
			if (err) {
				return done(err);
			}

			return done(null, newUser);
		});
	}));

	passport.use('local-signin', new LocalStrategy(function(username, password,
			done) {
		User.findOne({
			'dataLocal.username' : username
		}, function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, {
					message : 'Unknown user ' + username
				});
			}

			if (bcrypt.compareSync(password, user.password) === false) {
				return done(null, false, {
					message : 'Invalid password'
				});
			}
			return done(null, user);
		});
	}));

	passport.use(new FacebookStrategy(
			{
				clientID : '1587108738178207',
				clientSecret : '08180a72253539094e531b53be914c96',
				callbackURL : "http://localhost:8181/auth/facebook/callback",
				"profileFields" : [ "id", "email", "displayName", "gender",
						"location" ]
			}, function(accessToken, refreshToken, profile, done) {
				if (!profile.emails || !profile.emails.length) {
					return done('No emails associated with this account. . .');
				}
				User.findOneAndUpdate({
					'data.oauth' : profile.id
				}, {
					$set : {
						'profile.username' : profile.emails[0].value,
						'profile.email' : profile.emails[0].value,
						'profile.firstName' : profile.displayName,
						'profile.gender' : profile.gender,
						'profile.picture' : 'http://graph.facebook.com/'
								+ profile.id.toString() + '/picture?type=large'

					}
				}, {
					'new' : true,
					upsert : true,
					runValidators : true
				}, function(error, user) {
					done(error, user);
				});
			}));
	// Express middlewares
	app.use(require('express-session')({
		secret : 'this is a secret',
		resave : true,
		saveUninitialized : true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	// Express routes for auth

	app
			.get(
					'/auth/facebook',
					function(req, res, next) {
						var redirect = encodeURIComponent(req.query.redirect
								|| '/');
						passport
								.authenticate(
										'facebook',
										{
											scope : [ 'email', 'user_location',
													'user_birthday',
													'public_profile' ],
											callbackURL : 'http://localhost:8181/auth/facebook/callback?redirect='
													+ redirect
										})(req, res, next);
					});

	app.get('/auth/facebook/callback', function(req, res, next) {
		var url = 'http://localhost:8181/auth/facebook/callback?redirect='
				+ encodeURIComponent(req.query.redirect);
		passport.authenticate('facebook', {
			callbackURL : url
		})(req, res, next);
	}, function(req, res) {
		res.redirect(req.query.redirect);
	});
	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/signin', passport.authenticate('local-signin'),
			function(req, res) {
				res.json({
					success : true
				});
			});

	app.post('/signup', passport.authenticate('local-signup'), function(req,
			res) {
		res.json({
			success : true
		});
	});
}
module.exports = setupAuth;