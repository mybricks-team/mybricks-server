const jsonParse = require('json-parse');


module.exports = function (req, res, next) {

  const method = req.method.toLowerCase();

  let token = "";
  let param = {};
  let file = {};

  switch (true) {
    case method === "get":
      req.query = req.query || {};
      token = req.query.token || "";
      param = jsonParse({})(req.query.param);
      break;
      
    case method === "post" && !!req.is("application/x-www-form-urlencoded"):
      req.body = req.body || {};
      token = req.body.token || "";
      param = jsonParse({})(req.body.param);
      break;

    case method === "post" && !!req.is("multipart/form-data"):
      file = req.files.file;
      token = req.body.token || "";
      param = jsonParse({})(req.body.param);
  }


  req.body.token = token;
  req.body.param = param;
  req.body.file = file;

  next();

}