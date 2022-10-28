const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const yauzl = require('yauzl');

const services = module.exports = {};

services.unzip = (zipFilePath, unzipParentFolderPath) => {
  return new Promise((resolve, reject) => {

    const handleZipFile = (err, zipfile) => {
      if (err) {
        reject(err);
        return;
      }

      zipfile.on("close", () => {
        resolve({
          //返回解压后的内容
        });
      });

      zipfile.readEntry();

      zipfile.on("entry", (entry) => {
        let targetFileName = path.resolve(unzipParentFolderPath, entry.fileName);

        if (/\/$/.test(entry.fileName)) {
          mkdirp.sync(targetFileName);
          zipfile.readEntry();
        } else {

          let targetDirName = path.dirname(targetFileName);
          mkdirp.sync(targetDirName);

          zipfile.openReadStream(entry, (err, readStream) => {
            let writeStream = fs.createWriteStream(targetFileName);
            readStream.pipe(writeStream);
            zipfile.readEntry();
          });
        }
      });
    };
    yauzl.open(zipFilePath, { lazyEntries: true }, handleZipFile);
  })
}
