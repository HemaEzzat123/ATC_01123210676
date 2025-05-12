const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// Protected routes
router.get("/me", verifyToken, authController.getMe);
router.put("/profile", verifyToken, authController.updateProfile);
router.put("/password", verifyToken, authController.updatePassword);

module.exports = router;
