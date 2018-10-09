var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var Users = require('../models/users.js')

passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  
passport.deserializeUser(function (userName, done) {
    Users.getUser(id, function (err, user) {
        done(err, user[0].username)
    })
})

// test route @localhost:3001/api/test
router.get('/test', function(req, res) {
    res.json([
        {bruh: "this is a test",
        lol: "test"}
    ]);
    Users.getUser('test', function(err, user) {
        if (err) return err
        if (user[0].username === 'test') 
            b = true;
        console.log(user[0].username)
    }) ;
})

// random
passport.use('local-login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      Users.getUser(username, function (err, user) {
        consol.log('wtf')
        if (err) return done(err)
        if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
         User.comparePassword(password, user[0].password, function (err, isMatch) {
           if (err) throw err
           if (isMatch) {
             return done(null, user)
           } else {
             return done(null, false, req.flash('loginMessage', 'Invalid password'))
           }
         })
       })
    }
  ))

// random
router.post('/login/', function (req, res) {
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
        req.flash('loginMessage', errors[0].msg)
    } else {
        passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
        })(req, res)
    }
})

// Getter to validate but does NOT user passport => aka no session
router.get('/login/:username/:pw', function(req, res) {
    var us = req.params.username;
    var p = req.params.pw;

    console.log(p);
    console.log(us);
})


module.exports = router;