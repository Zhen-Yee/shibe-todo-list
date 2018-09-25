var express = require('express');
var app = express();
var routes = require('./routes/index');
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root1234',
    database : 'localdb'
  });
  
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

connection.query('SELECT * FROM testdb.Book;', function (err, rows, fields) {
    // if (err) throw err

    console.log('The solution is: ', rows[0])
});

connection.end();

app.use('/api', routes);
app.set('port', (process.env.PORT || 3001));
app.listen(3001, function() {
    console.log('Server opened on port ' + app.get('port'));
});