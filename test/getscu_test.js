/**
 * getscu
 */
const path = require('path');
const fs = require('fs');

const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);
const GetSCU = dcm4che.GetSCU;

let pid = '01521';
const getscuService = new GetSCU({
    connect: 'BSCQRAE@127.0.0.1:10002',
    directory: path.join(__dirname,'../dcmFiles-dcm4chee/getscu/byid/'+pid)
});

/**
 * PatientId
 */
getscuService.getDcmFilesByPatientId(pid).then(function(client) {
    client.on('data',function(params) {
        console.log('===============================data==========>');
        console.log(params.toString());
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/getscu_log.txt'),'================> stdout =>\r\n'+params.toString(),{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
    client.on('error',function(error) {
        console.log(error.toString());
    });
    client.on('result',function(result) {
        console.log('=============result======> :');
        console.log(result);
    });
}).catch(function(error) {
    console.error('=================get by pid error=========>');
    console.error(error);
});

/**
 * StudyId
 */
/* let sid = '1.2.840.113704.9.4021.1.0.20101201081429000';
getscuService.getDcmFilesByStudyId(sid).then(function(client) {
    client.on('data',function(params) {
        console.log('===============================data==========>');
        console.log(params.toString());
        fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/getscu_log.txt'),'================> stdout =>\r\n'+params.toString(),{flag: 'a'},function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
    client.on('error',function(error) {
        console.log(error.toString());
    });
    client.on('exit',function(code) {
        console.log('=============exit======> code:',code);
    });
    client.on('close', function(code) {
        console.log('=============close======> code:',code);
    });
}).catch(function(error) {
    console.error('=================get by studyId error=========>');
    console.error(error);
}); */