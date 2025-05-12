const express = require("express");
const router = express.Router();
const {
  getAllSettings,
  getSettingsByCategory,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
  getPublicSettings,
} = require("../controllers/settings.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

// Public routes
router.get("/public", getPublicSettings);

// Admin routes
router.use(isAdmin); // Protect all routes below with admin middleware
router.get("/", getAllSettings);
router.get("/category/:category", getSettingsByCategory);
router.get("/:key", getSetting);
router.post("/", createSetting);
router.put("/:key", updateSetting);
router.delete("/:key", deleteSetting);

module.exports = router;
