/**
 * 
 */
const net = require('net');
let config = {
    port: 8080,
    pacs: {
        // host: '192.192.13.12',
        host: '127.0.0.1',
        port: '11113'
    },
    dcmqrServer: {
        host: '127.0.0.1',
        port: '11114'
    }
}

function proxyToPacs(localSocket,data) {
    console.log('====proxyToPacs====');
    let remoteSocket = new net.Socket();
    remoteSocket.connect(config.pacs);
    localSocket.pipe(remoteSocket); 
    remoteSocket.pipe(localSocket);

    remoteSocket.on('connect',function() {
       remoteSocket.write(data); 
    });
    remoteSocket.on('end',function(){
        remoteSocket.destroy();
    });
    remoteSocket.on('error',function(error) {
        remoteSocket.destroy();
        console.error('=======to Pacs remoteSocket error========');
        console.error(error);
    });
    remoteSocket.on('close',function(){

    });
}

module.exports = {
    proxyToPacs: proxyToPacs
}