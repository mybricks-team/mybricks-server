const express = require('express');
const router = express.Router();

class FileController {
  
  
}

const fileController = new FileController();

/* GET file listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
