const router = require("express").Router();
const viceController = require("../../controllers/viceController");

router.route("/:email").get(viceController.getVicesForUser);

router
  .route("/")
  .post(viceController.createVice)
  .put(viceController.updateVice)
  .delete(viceController.deleteVice);

module.exports = router;
