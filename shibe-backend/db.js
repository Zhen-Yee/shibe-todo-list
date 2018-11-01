var mysql = require('mysql');
// var Sequelize = require('sequelize')

var state = {
    pool: null,
    mode: 'zhen_todo',
}

// Creates pool so that db can be used through different files
exports.connect = function(done) {
    state.pool = mysql.createPool({
        host: 'db-instance.cnzpquqwelgj.us-east-2.rds.amazonaws.com',
        user: 'michael',
        password: 'michaeltang123',
        database: 'zhen_todo'
    })

    done()
}

// var config = {
//     host: 'db-instance.cnzpquqwelgj.us-east-2.rds.amazonaws.com',
//     dialect: 'mysql', 
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     operatorAliases: false
// }

exports.get = function() {
    return state.pool
}

// exports.sequelize = new Sequelize(
//     'zhen_todo',
//     'michael',
//     'michaeltang123',
//     config
// );
