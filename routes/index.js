var express = require('express');
var router = express.Router();
var config = require('../config');
var fetchData = require('../lib/fetchdata');
var cookieSession = require('cookie-session');
var passport = require('passport'),
    util = require('util'),
    MeetupStrategy = require('passport-meetup').Strategy;

// var MEETUP_OAUTH_KEY = 's3ja62pntbsb6mctlkg07ln103';
// var MEETUP_OAUTH_SECRET = 'grsmt218cva1omfj2k7k4ned1p';


router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* Passport Meetup strategy */
passport.use(new MeetupStrategy({
  consumerKey: config.MEETUP_OAUTH_KEY,
  consumerSecret: config.MEETUP_OAUTH_SECRET,
  callbackURL: "https://127.0.0.1:3000/auth/meetup/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      return done(null, profile, token)
    })
  }
));
router.use(passport.initialize());
router.use(passport.session());


/* GET home page. */
router.get('/', function(req, res, next) {
  var url = "https://api.myjson.com/bins/17fagr";
  var prom = fetchData.get(url);
  console.log("session",req.session)
  prom.then(function(resp){
    res.render('index', { title: 'Attendees', jsondata: resp });
  }) 
});

router.get('/confirm', function(req, res, next) {
  res.render('confirm', { title: 'Confirm attendance' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/member', function(req, res, next) {
  res.render('member', { title: 'Member' });
});

router.get('/auth/meetup',
  passport.authenticate('meetup'),
  function(req, res){

});

router.get('/auth/meetup/callback',
  passport.authenticate('meetup', {failureRedirect: '/login'}),
  function(req, res){
    var url = "https://api.myjson.com/bins/8ai23";
    var prom = fetchData.get(url);
    prom.then(function(resp){
      
      res.render('index', { title: 'Attendees', jsondata: resp, user: req.user });
    })   
  }
)

module.exports = router;
