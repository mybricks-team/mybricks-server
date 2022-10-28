const morgan = require('morgan');
// morgan.token('status', function (req, res) { return res.body.status })
// morgan.token('message', function (req, res) { return res.body.message })
// morgan.token('fruit-name', function (req, res) { return res.body.fruit-name })
// morgan.token('timestamp', function (req, res) { return res.body.timestamp })

// app.use(morgan('tiny', {
//   stream: rfs.createStream('access.log', {
//     interval: '1d',
//     path: path.join(__dirname, 'logs')
//   })
// }));

module.exports = morgan;