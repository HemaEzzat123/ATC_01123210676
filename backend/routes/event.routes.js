const express = require("express");
const eventController = require("../controllers/event.controller");
const {
  verifyToken,
  optionalAuth,
  restrictTo,
} = require("../middlewares/auth.middleware");
const { uploadEventImage } = require("../middlewares/upload.middleware");

const router = express.Router();

// Public routes with optional authentication (to check booking status)
router.get("/", optionalAuth, eventController.getAllEvents);
router.get("/categories", eventController.getEventCategories);
router.get("/tags", eventController.getEventTags);
router.get("/:id", optionalAuth, eventController.getEvent);

// Protected routes (admin only)
router.use(verifyToken);
router.post(
  "/",
  restrictTo("admin"),
  uploadEventImage,
  eventController.createEvent
);
router.patch(
  "/:id",
  restrictTo("admin"),
  uploadEventImage,
  eventController.updateEvent
);
router.delete("/:id", restrictTo("admin"), eventController.deleteEvent);

module.exports = router;
