/**
 * 
 */
const dcm4chePath = '../../dcm4chee-js';
const dcm4che = require(dcm4chePath);

const MoveSCU = dcm4che.MoveSCU;

const moveScu = new MoveSCU({
    connect: 'BSCQRAE@:10002',
    dest: 'BSCAE'
});

moveScu.moveByPatientId('01521').then(function(client) {
    client.on('progress',function(data) {
        console.log(data.toString());
    });
    client.on('error',function(error) {
        console.error('==========error=========');
        console.error(error.toString());
    });
    client.on('result',function(result) {
        console.log('=======result=========>',result);
    });
}).catch(function(error) {
    console.error(error);
});