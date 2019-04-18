/**
 * localSocketEvents
 */
function listen(socket) {
    socket.on('error',function(error) {
        socket.destroy();
        console.error('=======localSocket error========');
        console.error(error);
    });
    socket.on('end',function(){
        socket.destroy();
    });
    socket.on('close',function(){
        // socket.destroy();
    });
}

module.exports = {
    listen: listen
}