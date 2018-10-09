var db = require('../db.js');

// Simple Get Query for Username
exports.getUser = function(userName, done) {
    db.get().query('SELECT * FROM zhen_todo.Users WHERE username = ?', userName, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
}