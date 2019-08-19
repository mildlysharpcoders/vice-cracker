const router = require("express").Router();
const userRoutes = require("./user");
const viceRoutes = require("./vice");
const twilioRoutes = require("./twilio");
const reminderRoutes = require("./reminder");
const statusRoutes = require("./status");

// User routes
router.use("/user", userRoutes);
router.use("/vice", viceRoutes);
router.use("/twilio", twilioRoutes);
router.use("/reminder", reminderRoutes);
router.use("/status", statusRoutes);

module.exports = router;