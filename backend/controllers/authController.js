const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const tokenPayload = {
      email: user.email,
      refreshToken,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

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
};

module.exports = { Login, Register };
