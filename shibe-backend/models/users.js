var db = require('../db.js');
var bcrypt = require('bcryptjs')

// Simple Get Query for Username
exports.getUser = function(userName, done) {
    db.get().query('SELECT * FROM zhen_todo.Users WHERE username = ?', userName, function (err, rows) {
        if (err) return done(err);
        console.log(rows[0] === undefined)
        done(null, rows);
    })
}

exports.comparePassword = function (inputPassword, dbPassword, callback) {
    bcrypt.compare(inputPassword, dbPassword, function (err, isMatch) {
      if (err) throw err
      console.log(isMatch)
      callback(null, isMatch)
    })
  }