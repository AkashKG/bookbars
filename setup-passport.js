/**
 Configuring passport-auth0
  **/
var passport= require('passport');
 var FacebookStrategy= require('passport-facebook');
 
passport.use(new FacebookStrategy({
	clientID: '1587108738178207' ,
	clientSecret: '08180a72253539094e531b53be914c96',
	callbackURL: "http://localhots:8181/auth/facebook/callback"
},
function(accessToken,refreshToken,profile,cb){
	 User.findOrCreate({facebookId:profile.id},function(err,user){
		 return cb(err,user);
	 });
	 
}
));