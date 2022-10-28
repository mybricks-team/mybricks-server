const compression = require('compression')
const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cors = require('cors');
const fileUpload = require('express-fileupload');

const logger = require('./src/middleware/logger');
const bodyParser = require('./src/middleware/bodyParser');
const cookieParser = require('cookie-parser');
const dayjs = require('dayjs');
const shortid = require('shortid');
const rfs = require('rotating-file-stream');

const { expressjwt } = require('express-jwt');
const config = require('config');
const SECRET = require('config').get('cryptoKey');

const bootLog = require('debug')('server:boot');
const reqLog = require('debug')('server:request');

bootLog("start", dayjs().format("YYYY/MM/DD HH:mm:ss"));

const app = express();

app.use(cors())
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(logger);
app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: path.resolve(__dirname, "./tmp")
}));

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static(path.join(__dirname, './public')));
app.use("/uploads", express.static(path.join(__dirname, './uploads')));

app.use((req, res, next) => {
  req.traceId = `trace:${shortid.generate()}`;
  reqLog("trace", req.traceId);
  next();
});

app.use(bodyParser);

/**
 * 注册路由
*/
let authorization = expressjwt({
  secret: SECRET,
  algorithms: ["HS256"],
  getToken(req, res, next) {
    return req.body.token;
  }
});

app.use('/api/test', require('./src/routes/test'));
app.use('/api/connect', require('./src/routes/connect'));
app.use('/api/workbench', require('./src/routes/workbench'));
app.use('/api/vscode', require('./src/routes/vscode'));
app.use('/api/file', require('./src/routes/file'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // invalid token
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ code: 2, result: "invalid token..." });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ code: 4, result: err });
});

module.exports = app;
