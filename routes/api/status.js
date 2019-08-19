const router = require("express").Router();
const statusController = require("../../controllers/statusController");

router.route("/:email").get(statusController.getStatusEntries);

module.exports = router;