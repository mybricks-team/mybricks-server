const router = require("express").Router();
const controller = require("../controllers/connect");

router.route("/connect/httpProxy").all(controller.httpProxy);

module.exports = router;
