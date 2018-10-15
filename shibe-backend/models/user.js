var db = require('../db')
var bcrypt = require('bcryptjs')
// var Sequelize = require('sequelize')
// const sequelize = new Sequelize('zhen_todo', 'michael', 'michaeltang123', {
//     host: 'db-instance.cnzpquqwelgj.us-east-2.rds.amazonaws.com',
//     dialect: 'mysql',
  
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
  
//     // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//     operatorsAliases: false
//   });

// User Schema
// var modelDefinition = {
//     username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },

//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },

//     phone: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     }
// };

// var UserModel = db.sequelize.define('user', modelDefinition)


// Simple Get Query for Username
exports.getUser = function(userName, done) {
    db.get().query('SELECT * FROM zhen_todo.Users WHERE username = ?', userName, function (err, rows) {
        if (err) return done(err);
        // console.log(rows[0] === undefined)
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

// module.exports = UserModel;
