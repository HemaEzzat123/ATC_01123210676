const Booking = require("../models/booking.model");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get all bookings for current user
exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate({
      path: "event",
      select: "name date venue price image",
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// Get single booking
exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate({
    path: "event",
    select: "name description date venue price image",
  });

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Check if the booking belongs to the current user or user is admin
  if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized to access this booking", 403));
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// Create new booking
exports.createBooking = catchAsync(async (req, res, next) => {
  const { eventId, quantity = 1 } = req.body;

  // Find the event
  const event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if event has available seats
  if (event.bookedSeats + quantity > event.capacity) {
    return next(
      new AppError("Event is fully booked or not enough seats available", 400)
    );
  }

  // Check if user has already booked this event
  const existingBooking = await Booking.findOne({
    user: req.user.id,
    event: eventId,
  });

  if (existingBooking) {
    return next(new AppError("You have already booked this event", 400));
  }

  // Calculate total price
  const totalPrice = event.price * quantity;

  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    event: eventId,
    quantity,
    totalPrice,
  });

  // Update event's booked seats
  event.bookedSeats += quantity;
  await event.save();

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// Cancel booking
exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Check if the booking belongs to the current user
  if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized to cancel this booking", 403));
  }

  // Check if booking is already cancelled
  if (booking.status === "cancelled") {
    return next(new AppError("Booking is already cancelled", 400));
  }

  // Update booking status
  booking.status = "cancelled";
  await booking.save();

  // Update event's booked seats
  const event = await Event.findById(booking.event);
  if (event) {
    event.bookedSeats -= booking.quantity;
    await event.save();
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// Admin: Get all bookings
exports.getAllBookings = catchAsync(async (req, res, next) => {
  // Only admin can access all bookings
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to access all bookings", 403));
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const bookings = await Booking.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "event",
      select: "name date venue price",
    })
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");

  const total = await Booking.countDocuments();

  res.status(200).json({
    success: true,
    count: bookings.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: bookings,
  });
});

// Admin: Update booking status
exports.updateBookingStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Only allow valid status values
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  booking.status = status;
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking,
  });
});
