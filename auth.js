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
	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for
	// signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will
		// override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, done) {

		process.nextTick(function() {

			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			User.findOne({
				'dataLocal.email' : email
			},
					function(err, user) {
						// if there are any errors, return the error
						if (err)
							return done(err);

						// check to see if theres already a user with that email
						if (user) {
							return done(null, false, req.flash('signupMessage',
									'That email is already taken.'));
						} else {

							// if there is no user with that email
							// create the user
							var newUser = new User();

							// set the user's local credentials
							newUser.dataLocal.email = email;
							newUser.dataLocal.password = newUser
									.generateHash(password);

							// save the user
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						}

					});

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

	app.get('/auth/facebook', function(req, res, next) {
			var redirect = encodeURIComponent(req.query.redirect|| '/');
			passport.authenticate('facebook',{
				scope : [ 'email', 'user_location','user_birthday', 'public_profile' ],
				callbackURL : 'http://localhost:8181/auth/facebook/callback?redirect='+ redirect
			})(req, res, next);
	});

	app.get('/auth/facebook/callback',
		    function(req, res, next) {
		      var url = 'http://localhost:8181/auth/facebook/callback?redirect=' +
		        encodeURIComponent(req.query.redirect);
		      passport.authenticate('facebook', { callbackURL: url })(req, res, next);
		    },
		    function(req, res) {
		      res.redirect(req.query.redirect);
	});

	app.get('/connect/local', function(req, res) {
	});
	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/connect/local',
		failureFlash : true
	}), function(req, res) {
		res.send('Welcome <img src ="' + req.user.dataLocal.email);
	});
}
module.exports = setupAuth;