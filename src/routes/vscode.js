const router = require("express").Router();
const controller = require("../controllers/vscode");

router.route("/comlib/publish").all(controller.comlibPublish);

module.exports = router;
