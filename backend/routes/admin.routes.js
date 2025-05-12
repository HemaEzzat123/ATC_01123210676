const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/admin.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

// Get admin statistics
router.get("/stats", isAdmin, getStats);

module.exports = router;
