const router = require("express").Router();
const userRoutes = require("./user");
const viceRoutes = require("./vice");
const twilioRoutes = require("./twilio");
const reminderRoutes = require("./reminder");

// User routes
router.use("/user", userRoutes);
router.use("/vice", viceRoutes);
router.use("/twilio", twilioRoutes);
router.use("/reminder", reminderRoutes);

module.exports = router;