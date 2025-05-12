const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
    },
    price: {
      type: Number,
      required: [true, "Event price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      default: "default-event.jpg",
    },
    capacity: {
      type: Number,
      default: 100,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual for checking if event is full
eventSchema.virtual("isFull").get(function () {
  return this.bookedSeats >= this.capacity;
});

// Virtual for getting available seats
eventSchema.virtual("availableSeats").get(function () {
  return this.capacity - this.bookedSeats;
});

// Ensure virtuals are included when converting to JSON
eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
