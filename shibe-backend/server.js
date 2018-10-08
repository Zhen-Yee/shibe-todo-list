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

connection.end();

app.use('/api', routes);
app.set('port', (process.env.PORT || 3001));
app.listen(3001, function() {
    console.log('Server opened on port ' + app.get('port'));
});