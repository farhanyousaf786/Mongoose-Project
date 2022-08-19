const router = require('express').Router();
const passport = require('passport');
const { resource } = require('../server');



// The root route renders our only view
router.get('/', function (req, res) {
  res.render('landingPage', { title: 'Mobile Gallery' });

});


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/mobiles', 
    failureRedirect: '/mobiles' 
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () { 
    res.redirect('/')
  })
})

module.exports = router;
