var http = require('http');

const server = http.createServer((req, res) => {
    res.write('Coming Soon');
    res.end();
});

server.listen(3000);

console.log('Server opened on port 3000');