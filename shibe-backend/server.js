var express = require('express');
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var app = express();
var routes = require('./routes/index');
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'db-instance.cnzpquqwelgj.us-east-2.rds.amazonaws.com',
    user     : 'michael',
    password : 'michaeltang123',
    database : 'zhen_todo'
  });
  
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

// connection.query('SELECT * FROM zhen_todo.Users;', function (err, rows, fields) {
//     // if (err) throw err

//     console.log('The solution is: ', rows[0])
// });
// connection.end();

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }))

// Passport Init
app.use(passport.initialize())
app.use(passport.session())

// Express Validator - taken from git page
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
      var root = namespace.shift()
      var formParam = root
  
      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      }
    }
  }))

// Connect Flash
app.use(flash())

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.login_message = req.flash('loginMessage')
  res.locals.signup_message = req.flash('signupMessage')
  res.locals.error = req.flash('error') // for passport
  res.locals.user = req.user || null // track if user logged in/out
  next()
})

app.use('/api', routes);
app.set('port', (process.env.PORT || 3001));
app.listen(3001, function() {
    console.log('Server opened on port ' + app.get('port'));
});