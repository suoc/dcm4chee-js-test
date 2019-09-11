/**
 * 
 */
const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);

const MoveSCU = dcm4che.MoveSCU;

const moveScu = new MoveSCU({
    connect: 'BSCQRAEA@:10002',
    // dest: 'BSCQRAEB',
    dest: 'BSCSCPAE',
});

// var patId = '01521';
var patId = '201909090126';

moveScu.moveByPatientId(patId).then(function(client) {
    client.on('progress',function(data) {
        console.log('C-MOVE: ',data.toString());
    });
    client.on('error',function(error) {
        console.error('C-MOVE: ','==========error=========');
        console.error(error.toString());
    });
    client.on('result',function(result) {
        console.log('C-MOVE: ','=======result=========>',result);
    });
}).catch(function(error) {
    console.error(error);
});