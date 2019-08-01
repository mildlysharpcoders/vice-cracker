const router = require("express").Router();
const userRoutes = require("./user");
const viceRoutes = require("./vice");

// User routes
router.use("/user", userRoutes);
router.use("/vice", viceRoutes);

module.exports = router;