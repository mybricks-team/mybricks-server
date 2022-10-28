const path = require('path');
const { publishComlib } = require('../services/publish');
const { unzip } = require('../services/zip');

const controller = module.exports = {};

controller.comlibPublish = (req, res) => {
  let file = req.body.file;
  console.log(file);

  //预检查
  if (file.mimetype !== "application/zip") {
    res.json({ code: 3, result: "文件类型错误" });
    return;
  }

  //解压到 /tmp/comlib
  unzip(file.tempFilePath, path.resolve(__dirname, "../../tmp/comlib")).then(() => {
    // 解析
    // 移动
  });

  res.json({ code: 3, result: "文件类型错误" });
  return;

  // let uploadFilePath = path.resolve(__dirname, `../../uploads/comlib/${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}/comlib.zip`);
  // file.mv(uploadFilePath).then((res) => {
  //   console.log(res);
  //   res.json({ code: 0, result: res });
  // }).catch(err => {
  //   res.json({ code: 0, result: err });
  // });

  return;
  //
  upload(file, {
    ext_name: "comlib"
  }).then(res => {

  }).catch(err => {

  });

  console.log(file);

  publishComlib(file).then(() => {
    res.json({ code: 0, aaa: 123 });
  }).catch(err => {
    res.json({ code: 4, aaa: 123 });
  });

}