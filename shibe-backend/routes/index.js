var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user.js')
var db = require('../db')

passport.serializeUser(function (user, done) {
    done(null, user.username)
  })
  
passport.deserializeUser(function (userName, done) {
    User.getUser(user, function (err, user) {
        done(err, user[0].username)
    })
})

// test route @localhost:3001/api/test
router.get('/test', function(req, res) {
    res.json([
        {bruh: "this is a test",
        lol: "test"}
    ]);
    User.getUser('az', function(err, user) {
        if (err) return err
        if (user[0].username === 'test') 
            b = true;
        console.log(user[0].username)
    }) ;
})

// *******************
// Login route
// *******************
router.post('/login', function (req, res) {
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
        req.flash('loginMessage', errors[0].msg)
    } else {
        passport.authenticate('local-login', {  // Goes to Login Authenticator
            failureFlash: true
        })(req, res)
      res.send(true);
    }
})

// Login authenticator
passport.use('local-login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      User.getUser(username, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
         User.comparePassword(password, user[0].password, function (err, isMatch) {
           if (err) throw err
           if (isMatch) {
                console.log('Login');
                return true
           } else {
                console.log('Didnt log in')
                return done(null, false, req.flash('loginMessage', 'Invalid password'))
           }
         })
       })
    }
))

// Getter to validate but does NOT user passport => aka no session
router.get('/login/:username/:pw', function(req, res) {
    var us = req.params.username;
    var p = req.params.pw;

    console.log(p);
    console.log(us);
})

// *******************
// Signup Route
// *******************
router.post('/signup', function (req, res) {
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Email is not valid').isEmail()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('phone', 'Phone is required').notEmpty()
    var errors = req.validationErrors()

    if (errors) {
        req.flash('signupMessage', errors[0].msg)
    } else {
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })(req, res)
        res.send(true);
    }
})

// Signup Authenticator
passport.use('local-signup', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      User.getUser(username, function (err, user) {
        if (err) return done(err)
        if (user !== undefined) {
          return done(null, false, req.flash('signupMessage', 'Username already in use'))
        } else {
          console.log('ding');
          var newUser = {
            username: req.body.username,
            password: password,
            email: req.body.email,
            phone: req.body.phone
          }
          User.signupUser(newUser, function (err, user) {
            if (err) console.log(err)
          })
        //   let b = db.get().query('SELECT * FROM zhen_todo.Users WHERE username = aa')
        //   console.log(b)
          req.login(newUser, function (err) {
            if (err) throw err
          })
        }
      })
    }
  ))


module.exports = router;