const express = require("express");
const bookingController = require("../controllers/booking.controller");
const { restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

// User routes
router.get("/my-bookings", bookingController.getMyBookings);
router.get("/:id", bookingController.getBooking);
router.post("/", bookingController.createBooking);
router.delete("/:id/cancel", bookingController.cancelBooking);
router.patch(
  "/:id/status",
  restrictTo("admin"),
  bookingController.updateBookingStatus
);
// Admin routes
router.get("/", restrictTo("admin"), bookingController.getAllBookings);

module.exports = router;
