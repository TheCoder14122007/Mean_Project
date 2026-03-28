const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // bcrypt import
const User = require("../models/User.Model");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "N",
        message: "User already exists"
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword // store hashed password
    });

    await newUser.save();

    return res.status(201).json({
      status: "Y",
      message: "User registered successfully",
      data: { name: newUser.name, email: newUser.email } // don’t return password
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required",
      });
    }

    // Check user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Success response
    return res.status(200).json({
      status: "Y",
      message: "Logged In Successfully",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error}`,
    });
  }
});

module.exports = router;