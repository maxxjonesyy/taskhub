const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken,
} = require("../controllers/authController");
const { verifyAccessToken } = require("../middleware/middleware");

router.post("/api/login", login);
router.post("/api/register", register);
router.get("/api/verify-token", verifyAccessToken, verifyToken);

module.exports = router;
