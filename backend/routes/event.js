const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware");

const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/event");

router.post("/",authenticateJWT, createEvent);
router.get("/", getEvents);
router.delete("/:id", authenticateJWT, deleteEvent);
router.put("/:id", authenticateJWT, updateEvent);

module.exports = router;