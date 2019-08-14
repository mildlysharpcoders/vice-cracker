const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../controllers/passportController");

router.route("/").get(userController.getAllUsers);

router.route("/getAuthenticatedUser").get(userController.getAuthenticatedUser);

router
  .route("/login")
  .post(passport.authenticate("local"), userController.login);

router.route("/logout").post(userController.logout);

router.route("/create").post(userController.create);

router.route("/whack").get(userController.whackUsers);

module.exports = router;
