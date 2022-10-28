const express = require('express');
const router = express.Router();

class PageController {
  
}

const pageController = new PageController();

router.post('/publish', function(req, res, next) {
  res.json('respond with a resource');
});

module.exports = router;
