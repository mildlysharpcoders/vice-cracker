const router = require("express").Router();
const viceController = require("../../controllers/viceController");

router.route("/:email").get(viceController.getVicesForUser);

router.route("/:id").delete(viceController.deleteVice);

router
  .route("/")
  .post(viceController.createVice)
  .put(viceController.updateVice);

router.route("/event").post(viceController.createViceEvent);

module.exports = router;
