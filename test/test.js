/**
 * 
 */
const {spawn}  = require('child_process');
const fs = require('fs');
const spawnObj = spawn('ping', ['127.0.0.1','-t'], {encoding: 'utf-8'});
console.log(Object.keys(spawnObj));
spawnObj.stdout.on('data', function(chunk) {
    console.log(chunk.toString());
});
spawnObj.stderr.on('data', (data) => {
  console.log(data);
});
spawnObj.on('close', function(code) {
    console.log('close code : ' + code);
})
spawnObj.on('exit', (code) => {
    console.log('exit code : ' + code);
    fs.close(fd, function(err) {
        if(err) {
            console.error(err);
        }
    });
});

/* setTimeout(() => {
    spawnObj.close();
}, 5000); */