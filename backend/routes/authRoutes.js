const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken,
  verifyEmailExists,
  sendResetCode,
  resetPassword,
} = require("../controllers/authController");
const { verifyAccessToken } = require("../middleware/middleware");

router.post("/auth/login", login);
router.post("/auth/register", register);
router.get("/auth/verify-token", verifyAccessToken, verifyToken);
router.post("/auth/verify-email", verifyEmailExists);
router.post("/auth/send-reset-code", sendResetCode);
router.post("/auth/reset-password", resetPassword);

module.exports = router;
