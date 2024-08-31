const mongoose = require("mongoose");

// Define Seat Schema
const seatSchema = new mongoose.Schema({
  seat_id: Number,
  available: { type: Boolean, default: true },
  bookedBy: { type: String, default: null }, // New field to store the name of the person who booked the seat
});

// Define Room Schema
const roomSchema = new mongoose.Schema({
  room_id: Number,
  seats: [seatSchema],
});

// Create Models
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
