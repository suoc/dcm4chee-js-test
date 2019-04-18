/**
 * 
 */
const net = require('net');
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

function proxyToDcmqrServer(localSocket,data) {
    console.log('====proxyToDcmqrServer====');
    let remoteSocket = new net.Socket();
    remoteSocket.connect(config.dcmqrServer);
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
        console.error('=======to dcmQRserver remoteSocket error========');
        console.error(error);
    });
    remoteSocket.on('close',function(){
        
    });
}

module.exports = {
    proxyToDcmqrServer: proxyToDcmqrServer
}