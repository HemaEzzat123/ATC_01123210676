const Event = require("../models/event.model");
const Booking = require("../models/booking.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get all events with filters and pagination
exports.getAllEvents = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((field) => delete queryObj[field]);

  // Filter by category, date range, price range
  let query = Event.find(queryObj);

  // Filter by category
  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }

  // Filter by date range
  if (req.query.startDate && req.query.endDate) {
    query = query.find({
      date: {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      },
    });
  }

  // Filter by price range
  if (req.query.minPrice && req.query.maxPrice) {
    query = query.find({
      price: {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      },
    });
  }

  // Filter by tags
  if (req.query.tags) {
    const tags = req.query.tags.split(",");
    query = query.find({ tags: { $in: tags } });
  }

  // Filter by search term
  const searchTerm = req.query.search;
  const category = req.query.category;

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { venue: { $regex: searchTerm, $options: "i" } },
    ];
  }
  if (category && category !== "all") {
    query.category = category;
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-date");
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  // Pagination
  query = query.skip(skip).limit(limit);

  // Execute query
  const events = await query.populate("createdBy", "name");

  // Get total count for pagination
  const total = await Event.countDocuments(queryObj);

  // If user is logged in, check for booked events
  let bookedEvents = [];
  if (req.user) {
    const bookings = await Booking.find({ user: req.user.id });
    bookedEvents = bookings.map((booking) => booking.event.toString());
  }

  // Add isBooked field to events
  const eventsWithBookingStatus = events.map((event) => {
    const eventObj = event.toObject();
    eventObj.isBooked = bookedEvents.includes(event._id.toString());
    return eventObj;
  });

  res.status(200).json({
    success: true,
    count: events.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: eventsWithBookingStatus,
  });
});

// Get single event
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate(
    "createdBy",
    "name"
  );

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if event is booked by the user
  let isBooked = false;
  if (req.user) {
    const booking = await Booking.findOne({
      user: req.user.id,
      event: event._id,
    });
    isBooked = !!booking;
  }

  const eventObj = event.toObject();
  eventObj.isBooked = isBooked;

  res.status(200).json({
    success: true,
    data: eventObj,
  });
});

// Create new event
exports.createEvent = catchAsync(async (req, res, next) => {
  // Only admins can create events
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to create events", 403));
  }

  // Add user id to event
  req.body.createdBy = req.user.id;

  // Handle image upload if there's a file
  if (req.file) {
    req.body.image = req.file.path;
  }

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
});

// Update event
exports.updateEvent = catchAsync(async (req, res, next) => {
  // Only admins can update events
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to update events", 403));
  }

  // Handle image upload if there's a file
  if (req.file) {
    req.body.image = req.file.path;
  }

  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// Delete event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  // Only admins can delete events
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete events", 403));
  }

  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Remove all bookings associated with this event
  await Booking.deleteMany({ event: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Get event categories
exports.getEventCategories = catchAsync(async (req, res, next) => {
  const categories = await Event.distinct("category");

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// Get event tags
exports.getEventTags = catchAsync(async (req, res, next) => {
  const tags = await Event.distinct("tags");

  res.status(200).json({
    success: true,
    data: tags,
  });
});
