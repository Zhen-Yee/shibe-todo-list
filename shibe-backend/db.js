var mysql = require('mysql');

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

exports.get = function() {
    return state.pool
}