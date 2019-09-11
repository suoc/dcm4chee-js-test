/**
 * getscu
 */
const path = require('path');
const fs = require('fs');

const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);
const StoreSCP = dcm4che.StoreSCP_v2;
const storescp = new StoreSCP({
    port: '10003',
    ae: 'BSCSCPAE',
    directory: path.join(__dirname,'../dcmFiles-dcm4chee/storescp_files/')
});

storescp.on('open',function(port) {
   console.log('SCP-test: ','========store scp server opened======listen on:',port); 
});
storescp.on('connection',function(session) {
    session.on('storescpserver_open',function(message) {
        console.log('SCP-test: ','======backscp server created=========',message);
    });
    /* session.on('progress',function(data) {
        console.log('SCP-test: ',data.toString());
    }); */
    session.on('file',function(filePath) {
        console.log('SCP-test: ','==file==',filePath);
    });
    session.on('result',function(result) {
        console.log('SCP-test: ',result);
    });
    session.on('error',function(error) {
        console.error('SCP-test: ',error);
    });
});


