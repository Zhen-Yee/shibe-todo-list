var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user.js')
var db = require('../db')
var jwt = require("jsonwebtoken");
var cron = require('node-cron');
// Twilio auth toke and sid
const accountSid = 'AC4052543afc6326e854ebd611fedd3062';
const authToken = '161e06fdf03f4af31fe67415ef5d13d1';
var client = require('twilio')(accountSid, authToken)


passport.serializeUser(function (user, done) {
    done(null, user.username)
})

passport.deserializeUser(function (userName, done) {
    User.getUser(user, function (err, user) {
        done(err, user[0].username)
    })
})

// test route @localhost:3001/api/test
router.get('/test', function (req, res) {
    res.json([
        {
            bruh: "this is a test",
            lol: "test"
        }
    ]);
    User.getUser('az', function (err, user) {
        if (err) return err
        if (user[0].username === 'test')
            b = true;
        console.log(user[0].username)
    });
})

// *******************
// Login route
// *******************
router.post('/login', function (req, res) {
    var user = req.body;
    var response = res;
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
        req.flash('loginMessage', errors[0].msg)
    } else {
        passport.authenticate('local-login', {  // Goes to Login Authenticator
            failureFlash: true
        }, function (req, res) {
            if (req) {
                var token = jwt.sign(user, 'log');
                response.send({ logged: true, jwt: token });
            }
        })(req, res)
    }
})

// Login authenticator
passport.use('local-login', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
        User.getUser(username, function (err, user) {
            if (err) return done(err)
            // this return when the user doesnt exists
            if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
            User.comparePassword(password, user[0].password, function (err, isMatch) {
                if (err) throw err
                if (isMatch) {
                    console.log('Login');
                    return done(true);
                } else {
                    console.log('Didnt log in')
                    return done(null, false);
                }
            })
        })
    }
))

// Getter to validate but does NOT user passport => aka no session
router.get('/login/:username/:pw', function (req, res) {
    var us = req.params.username;
    var p = req.params.pw;
    console.log('loool');
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
passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
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
                req.login(newUser, function (err) {
                    if (err) throw err
                })
            }
        })
    }
))

router.post('/addTodo', function (req, res) {
    var username = req.body[0];
    var todo = JSON.stringify(req.body[1]);
    User.addTodo(username, todo, function (err) {
        if (err) return err;
    });
})

router.post('/deleteTodo', function (req, res) {
    var username = req.body[0];
    var todo = JSON.stringify(req.body[1]);
    console.log(todo);
    User.deleteTodo(username, todo, function (err) {
        if (err) return err;
    });
})

router.post('/updateTodos', function (req, res) {
    console.log(req.body)
    var username = req.body[0];
    var todosDone = req.body[1];
    // console.log(todosDone);
    if (Array.isArray(todosDone) || todosDone.length) {
        todosDone.forEach(todoDone => {
            User.deleteTodo(username, todoDone, function (err) {
                if (err) throw err;
            })
        });
    } else {
        console.log('Nothing to update.')
    }

})

router.get('/getTodos/:username', function (req, res) {
    var username = req.params.username;
    User.getTodos(username, function (err, todos) {
        if (err) return err;
        console.log(todos);
        if (todos === undefined) {
            res.send('nothing')
        } else {
            res.send(todos);
        }
    })
})

router.post('/reminder', function (req, res) {
    var username = req.body[0];
    var remindTodo = req.body[1];
    var time = req.body[2];

    User.getPhone(username, function (err, phone) {
        if (err) return err;
        client.messages
            .create({
                body: 'Test Message',
                from: '+15878415239',
                to: '+15142902870'
            })
            .then(message => console.log(message.sid))
            .done();
    })

})


module.exports = router;