/**
 * getscu
 */
const path = require('path');
const fs = require('fs');

const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);
const StoreSCP = dcm4che.StoreSCP_v2;

const cluster = require('cluster');

if (cluster.isMaster) {
  // init cluster
  require('os').cpus().forEach(() => {
    cluster.fork();
  });

  // add eventlisteners
  Object.values(cluster.workers).forEach(worker => {
    worker.on('message', message => {
      console.log(message);
    });
  });
} else {
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
            console.log('SCP-test<storescpserver_open>: ','======backscp server created=========',message);
        });
        /* session.on('progress',function(data) {
            console.log('SCP-test: ',data.toString());
        }); */
        session.on('file',function(filePath) {
            // console.log('SCP-test<file>: ','==file==',filePath);
            fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/'+process.pid+'_scp_log.txt'),filePath+'\r\n',{flag: 'a'},function(params) {
        
            });
        });
        session.on('result',function(result) {
            console.log('SCP-test<result>: result=>',result.files.length);
        });
        session.on('error',function(error) {
            console.error('SCP-test<error>: ',error);
        });
    });
}




