var express = require('express');
var app = express();
var routes = require('./routes/index');

app.use('/api', routes);
app.set('port', (process.env.PORT || 3001));
app.listen(3001, function() {
    console.log('Server opened on port ' + app.get('port'));
});