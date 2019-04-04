/**
 * 
 */
const net = require('net');
const fs = require('fs');
const path = require('path');

const server = new net.Server();

server.on('connection',function(socket) {
    console.log('======on connection-========>');
    let remoteSocket = new net.Socket();
    remoteSocket.connect(10002);
    socket.pipe(remoteSocket); 
    remoteSocket.pipe(socket);

    let i = 0;
    /* socket.on('data',function(data) {
        let _i = i;
        i++;
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),`\r\n\r\n\r\n================local socket ${_i}=>\r\n\r\n\r\n`,{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),data.toString(),{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
    }); */
    socket.once('data',function(data) {
        let _i = i;
        i++;
        console.log(data);
        console.log(data.toString());
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),`\r\n\r\n\r\n================local socket ${_i}=>\r\n\r\n\r\n`,{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),data.toString(),{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
    /* remoteSocket.on('data',function(data) {
        let _i = i;
        i++;
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),`\r\n\r\n\r\n================remoteSocket socket ${_i}=>\r\n\r\n\r\n`,{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/testtcp_log.txt'),data.toString(),{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
    }); */
    socket.on('end',function(){
        console.log('============local socket ended!========');
        socket.destroy();
    });
    remoteSocket.on('end',function(){
        console.log('============remote socket ended!========');
        remoteSocket.destroy();
    });
});

server.listen('10004',function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('server listen on port:',10004);
});