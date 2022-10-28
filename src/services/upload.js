const fs = require('fs');
const path = require('path');

const services = module.exports = {};

services.upload = (file) => {
  return new Promise((resolve, reject) => {
    console.log(file);
    resolve();
  });

}

// fs.rename(oldpath, newpath, function (err) {
//   if (err) throw err;
//   res.write('File uploaded and moved!');
//   res.end();
// });