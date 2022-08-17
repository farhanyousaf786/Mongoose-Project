const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
    async function(accessToken, refreshToken, profile, cb){ 
      console.log(profile, " <- this is the profile from google")
      
      const user = await User.findOne({googleId: profile.id});
     
      if(user) return cb(null, user);
    
     
      try {
        const newUser = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value, 
          avatar: profile.photos[0].value,
        })
        
        return cb(null, newUser)

      } catch(err){
  
        return cb(err)
      }
    }
  )
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, userDocument){
		if(err) return done(err)
		done(null, userDocument); 
	})
});
