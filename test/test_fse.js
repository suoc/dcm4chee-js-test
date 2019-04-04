/**
 * fse测试
 */
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

let src = '../tmp/13841/skfjd.jj.fdkjsk.dksjf';
let dest = '../tmp/fse/move/*';

console.log(path.join('/hhh/ggggg',path.basename(src)));

fs.renameSync(src,dest);

