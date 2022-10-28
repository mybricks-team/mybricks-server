const router = require("express").Router();
const controller = require("../controllers/test");

router.route("/zip").all(controller.zip);
router.route("/unzip").all(controller.unzip);

module.exports = router;
