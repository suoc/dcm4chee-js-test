/**
 * 
 */
const net = require('net');

let server = net.createServer();
let config = {
    port: 8080,
    pacs: {
        host: '192.192.13.12',
        port: '104'
    },
    dcmqrServer: {
        host: '127.0.0.1',
        port: '11114'
    }
}

const dcmqrserverProxyService  = require('./service/dcmqrserverProxyService');
const pacsProxyService = require('./service/pacsProxyService');

server.on('connection',function(socket) {

    socket.once('data',function(data) {
        console.log(data);
        for (const pair of data.entries()) {
            if (pair[0] == 4 && pair[1] == 1) {
                pacsProxyService.proxyToPacs(socket,data);
            }
            if (pair[0] == 4 && pair[1] == 14) {
                dcmqrserverProxyService.proxyToDcmqrServer(socket,data);
            }
        }

    });
    require('./events/localSocketEvents').listen(socket);
});

server.listen(config.port, function(err) {
    if (err) {
        console.log('========listen error=====>',err);  
        return;
    }
    console.log('========Tcp server listen on==>',config.port);
});