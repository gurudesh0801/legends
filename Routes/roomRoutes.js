const express = require("express");
const router = express.Router();
const Room = require("../Room/Room"); // Adjust the path as needed

// Define your routes here
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/rooms/:room_id/seats/:seat_id/book", async (req, res) => {
  try {
    const { room_id, seat_id } = req.params;
    const { name } = req.body;
    console.log(name);
    const room = await Room.findOne({ room_id });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const seat = room.seats.find((seat) => seat.seat_id === parseInt(seat_id));
    if (!seat) return res.status(404).json({ message: "Seat not found" });

    if (!seat.available)
      return res.status(400).json({ message: "Seat is already booked" });

    seat.available = false;
    seat.bookedBy = name;
    await room.save();

    res.json({ message: "Seat booked successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
