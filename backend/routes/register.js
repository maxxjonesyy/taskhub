const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

router.post("/api/register", async (req, res) => {
  try {
    const email = validator.escape(req.body.email);
    const password = validator.escape(req.body.password);

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a correct email address" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error: `Password must contain: 
        At least 8 characters
        At least 1 uppercase letter
        At least 1 lowercase letter
        At least 1 number`,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    res.status(200).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

module.exports = router;
