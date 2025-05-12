const User = require("../models/user.model");
const Event = require("../models/event.model");
const Booking = require("../models/booking.model");

const getStats = async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get upcoming events
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    // Get total revenue from confirmed bookings
    const confirmedBookings = await Booking.find({ status: "confirmed" })
      .populate("event", "price")
      .populate("user", "name email");

    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      return sum + booking.event.price * booking.quantity;
    }, 0);

    // Get bookings by status
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get events by category
    const eventsByCategory = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent bookings with user and event details
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("event", "title date location");

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      newUsers,
      upcomingEvents,
      totalRevenue,
      bookingsByStatus: bookingsByStatus.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      eventsByCategory: eventsByCategory.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      recentBookings,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Error fetching admin statistics" });
  }
};

module.exports = {
  getStats,
};
