const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/api/login", async (req, res) => {
  try {
    const email = validator.escape(req.body.email);
    const password = validator.escape(req.body.password);

    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Login successful",
      data: { email: user.email, token },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

module.exports = router;
