const router = require("express").Router();
const reminderController = require("../../controllers/reminderController");

router.route("/entry").get(reminderController.sendEntryReminders);

router.route("/status").get(reminderController.sendStatusReminders);

router.route("/streaks").get(reminderController.sendStreakStatusReminders);

module.exports = router;
