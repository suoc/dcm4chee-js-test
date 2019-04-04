/**
 * 
 */
const net = require('net');

const server = new net.Server();

server.on('connection',function(socket) {
    console.log('============on connection 10005==========');
    socket.on('data',function(data) {
        console.log('==========10005=======>');
        console.log(data);
    })
});

server.listen('10005',function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('server listen on port:',10005);
});