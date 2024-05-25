const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const Project = require("../models/project");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const generateCode = () => {
  const digits = [];
  for (let i = 0; i < 4; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    digits.push(randomDigit);
  }
  return digits.join("");
};

const login = async (req, res) => {
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

    const returnedUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    };

    res.status(200).json({
      message: "Login successful",
      user: returnedUser,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

const register = async (req, res) => {
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      username: email.split("@")[0],
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

const verifyToken = async (req, res) => {
  res.status(200).json({ message: "Token verified" });
};

const verifyEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    return res.status(200).json({ message: "Email found" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while verifying email" });
  }
};

const sendResetCode = async (req, res) => {
  try {
    const { email } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const user = await User.findOne({ email });

    if (!email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    user.resetCode = generateCode();

    await user.save();

    const { error } = await resend.emails.send({
      from: "Taskhub <onboarding@resend.dev>",
      to: [email],
      subject: "Recover password",
      html: `<p>Paste the following code to reset your password: <b>${user.resetCode}</b></p>`,
    });

    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while sending email" });
    }

    return res.status(200).json({ message: `Reset code sent to: ${email}` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while sending email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;
    const user = await User.findOne({ resetCode: code });

    if (!code || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid code" });
    }

    await User.updateOne({ resetCode: code }, { $unset: { resetCode: 1 } });
    user.password = await bcrypt.hash(password, 10);

    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const projects = await Project.find({ createdBy: user._id });

    if (user) {
      if (projects) {
        await Project.deleteMany({ createdBy: user._id });
      }
      await user.deleteOne();
      return res.status(200).json({ message: "Account deleted" });
    } else {
      return res.status(400).json({ error: "Error deleting account" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting account" });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
  verifyEmailExists,
  sendResetCode,
  resetPassword,
  deleteAccount,
};
