const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware");

const {
  createGallery,
  getGallerys,
  deleteGallery,
  updateGallery,
} = require("../controllers/gallery");

router.post("/",authenticateJWT, createGallery);
router.get("/", getGallerys);
router.delete("/:id", authenticateJWT, deleteGallery);
router.put("/:id", authenticateJWT, updateGallery);

module.exports = router;