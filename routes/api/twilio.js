const router = require("express").Router();
const twilioController = require("../../controllers/twilioController");

router
  .route("/")
  .post(twilioController.createTextNotification)

module.exports = router;
