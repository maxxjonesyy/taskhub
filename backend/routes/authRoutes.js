const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken,
} = require("../controllers/authController");
const { verifyAccessToken } = require("../middleware/middleware");

router.post("/auth/login", login);
router.post("/auth/register", register);
router.get("/auth/verify-token", verifyAccessToken, verifyToken);

module.exports = router;
