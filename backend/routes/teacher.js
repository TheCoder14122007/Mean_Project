const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware");

const {
  createTeacher,
  getTeachers,
  deleteTeacher,
  updateTeacher
} = require("../controllers/teacher"); // fixed require

// CRUD routes
router.post("/", authenticateJWT, createTeacher);
router.get("/", authenticateJWT, getTeachers);
router.delete("/:id", authenticateJWT, deleteTeacher);
router.put("/:id", authenticateJWT, updateTeacher);

module.exports = router;