const express = require("express");
const userController = require("../controllers/user.controller");
const { restrictTo } = require("../middlewares/auth.middleware");
const { uploadProfileImage } = require("../middlewares/upload.middleware");

const router = express.Router();

// User routes
router.patch("/profile", uploadProfileImage, userController.updateMyProfile);

// Admin routes
router.get("/", restrictTo("admin"), userController.getAllUsers);
router.get("/:id", restrictTo("admin"), userController.getUserById);
router.patch("/:id", restrictTo("admin"), userController.updateUser);
router.delete("/:id", restrictTo("admin"), userController.deleteUser);
router.patch("/:id/role", restrictTo("admin"), userController.updateUserRole);
module.exports = router;
