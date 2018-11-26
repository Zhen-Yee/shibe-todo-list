var db = require('../db')
var bcrypt = require('bcryptjs')

// Simple Get Query for Username
exports.getUser = function(userName, done) {
    db.get().query('SELECT * FROM zhen_todo.Users WHERE username = ?', userName, function (err, rows) {
        if (err) return done(err);
        if (rows.length === 0) return done(err);
        done(null, rows);
    })
}

exports.comparePassword = function(inputPassword, dbPassword, callback) {
    bcrypt.compare(inputPassword, dbPassword, function (err, isMatch) {
      if (err) throw err
      console.log(isMatch);
      callback(null, isMatch)
    })
  }

exports.signupUser = function(newUser, callback){
    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err
            newUser.password = hash
            console.log(hash);
            db.get().query(`INSERT INTO zhen_todo.Users (username, password, email, phone) VALUES ('${newUser.username}', '${newUser.password}', '${newUser.email}', '${newUser.phone}')`, function (err, result) {
                if (err) throw err;
                console.log(`User ${newUser.username} Successfully signed up.`);
            })
        })
    })
}

exports.addTodo = function(username, todo, done) {
   db.get().query(`INSERT INTO zhen_todo.Todos (username, todo) VALUES ('${username}', '${todo}')`, function (err, results) {
       if (err) throw err;
       console.log('Todo added.');
   })
}

exports.deleteTodo = function(username, todo, done) {
    db.get().query(`DELETE FROM zhen_todo.Todos WHERE username = '${username}' AND todo = '${todo}'`, function (err, results) {
        if (err) throw err;
        console.log('Todo deleted.')
    })
}

exports.getTodos = function(username, done) {
    db.get().query('SELECT todo FROM zhen_todo.Todos WHERE username = ?', username, function (err, rows) {
        if (err) return done(err);
        if (rows.length === 0) return [];
        done(null, rows); 
    })
}

exports.getPhone = function(username, done) {
    db.get().query('SELECT phone FROM zhen_todo.Todos WHERE username = ?', username, function (err, rows) {
        if (err) return done(err);
        if (rows.length === 0) return [];
        done(null, rows);
    })
}

// module.exports = UserModel;
