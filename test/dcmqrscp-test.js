/**
 * SCP
 */
const path = require('path');
const os = require('os');

let scpCom = 'dcmqrscp.bat';
if (os.platform().indexOf('win32') < 0) {
    scpCom = './dcmqrscp';
}
const option = {
    encoding: 'utf-8',
    cwd: '../dcm4chee-js/apps/lib/dcm4che-5.12.0/bin/'
};
let args = ['-b','BSCQRAEA@:10002',
            '--dicomdir',path.join(path.dirname(require.main.filename),'/dcmFiles-dcm4chee/BSCQRAE_A/dcmFiles'),
            '--ae-config',path.join(path.dirname(require.main.filename),'/configs/qr_aes.properties')
            ];
// let args = ['-h'];

const {spawn}  = require('child_process');
const fs = require('fs');

const spawnObj = spawn(scpCom, args, option);

// console.log(Object.keys(spawnObj));
spawnObj.stdout.on('data', function(chunk) {
    console.log('DCMQRSCP: ','================> stdout =>');
    console.log(chunk.toString());
    fs.writeFile(path.join(path.dirname(require.main.filename),'/logs/qrscp_log.txt'),'================> stdout =>\r\n'+chunk.toString(),{flag: 'a'},function(params) {
        
    });
});
spawnObj.stderr.on('data', (data) => {
    console.log('DCMQRSCP: ','================> stderr =>');
    console.log('DCMQRSCP: ',data.toString());
});
spawnObj.on('error', function(error) {
    console.log('DCMQRSCP: ','=============>error : ', error);
});
spawnObj.on('close', function(code) {
    console.log('DCMQRSCP: ','=============>close code : ' + code);
})
spawnObj.on('exit', (code) => {
    console.log('DCMQRSCP: ','=============>exit code : ' + code);
    /* fs.close(fd, function(err) {
        if(err) {
            console.error(err);
        }
    }); */
});