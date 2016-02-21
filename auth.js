/**
 * Configuring passport-auth0
 */
function setupAuth(User, app) {
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;

	passport.serializeUser(function(user,done){
		done(null,user._id);
	});
	passport.deserializeUser(function(id,done){
		User.findOne({_id:id}).exec(done);
	});
	passport.use(new FacebookStrategy({
		clientID : '1587108738178207',
		clientSecret : '08180a72253539094e531b53be914c96',
		callbackURL : "http://localhost:8181/auth/facebook/callback",
		"profileFields": ["id","email"]
	}, function(accessToken, refreshToken, profile, done) {
		if(!profile.emails || !profile.emails.length){
			return done('No emails associated with this account. . .');
		}
		User.findOneAndUpdate(
				{'data.oauth':profile.id},
				{
					$set:{
						'profile.username':profile.emails[0].value,
						'profile.picture':'http://graph.facebook.com/' + profile.id.toString() + '/picture?type=large'
					}
				},
				{'new':true, upsert:true, runValidators:true},
				function(error,user){
					done(error,user);
				});
	}));
	  // Express middlewares
	  app.use(require('express-session')({
	    secret: 'this is a secret',
	    resave: true,
	    saveUninitialized: true
	  }));
	  app.use(passport.initialize());
	  app.use(passport.session());

	  // Express routes for auth
	  app.get('/auth/facebook',
			  passport.authenticate('facebook', { scope: ['email'] })),

	  app.get('/auth/facebook/callback',
	    passport.authenticate('facebook', { failureRedirect: '/fail' }),
	    function(req, res) {
	      res.send('Welcome <img src ="' + req.user.profile.picture +'"><br>' + req.user.profile.username);
	    })
}

module.exports = setupAuth;