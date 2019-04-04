/**
 * getscu
 */
const path = require('path');
const fs = require('fs');

const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);
const StoreSCP = dcm4che.StoreSCP;
const storescp = new StoreSCP({
    port: '10003',
    ae: 'BSCAE',
    directory: path.join(__dirname,'../dcmFiles-dcm4chee/storescp_files/')
});

storescp.on('open',function(port) {
   console.log('========store scp server opened======listen on:',port); 
});
storescp.on('connection',function(session) {
    session.on('storescpserver_open',function(message) {
        console.log('======backscp server created=========',message);
    });
    session.on('progress',function(data) {
        console.log(data.toString());
    });
    session.on('result',function(result) {
        console.log(result);
    });
    session.on('error',function(error) {
        console.error(error);
    });
});


