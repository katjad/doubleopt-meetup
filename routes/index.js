var express = require('express');
var router = express.Router();
var config = require('../config');
var fetchData = require('../lib/fetchdata');
var cookieSession = require('cookie-session');
var chapters = require('../lib/haskellchapters');
var passport = require('passport'),
    MeetupStrategy = require('passport-meetup').Strategy;

var authurl = config.HOST+'/auth/meetup/callback';
var dataurl = 'https://api.myjson.com/bins/'+config.DATA;
    

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],  
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

passport.serializeUser(function(user, done) {
  userobj = {"id":user.id, "name": user.displayName}
  done(null, userobj);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* Passport Meetup strategy */
passport.use(new MeetupStrategy({
  consumerKey: config.MEETUP_OAUTH_KEY,
  consumerSecret: config.MEETUP_OAUTH_SECRET,
  callbackURL: authurl
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      /* the done method takes 
      an error object and the user obj if it exists
      different cases
      error doing anything -> done(error)
      no user obj -> done(null, false)
      everything right -> done(null, profile) */    
      return done(null, profile)
    })
  }
));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function(req, res, next) {
  var prom = fetchData.get(dataurl);
  // console.log("session p",req.session.passport)
  if(req.session.passport){
    var user = req.session.passport.user 
  }
  prom.then(function(resp){  
    var jsonmod = JSON.stringify(resp)
    var chaptersmod = JSON.stringify(chapters)
    res.render('index', { 
      title: 'Haskell 1 May 2018', 
      chapters: chapters, 
      chaptersmod: chaptersmod,
      jsonmod: jsonmod,  
      jsondata: resp, user: user });
  }) 
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/logout', function(req, res, next){
  req.logout()
  res.redirect('/')
})

router.get('/auth/meetup',
  passport.authenticate('meetup'),
  function(req, res){

});

router.get('/auth/meetup/callback',
  passport.authenticate('meetup', {failureRedirect: '/login'}),
  function(req, res){    
    res.redirect('/')  
  }
)

module.exports = router;
