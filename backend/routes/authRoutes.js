const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken,
  verifyEmailExists,
  sendResetCode,
  resetPassword,
  deleteAccount,
} = require("../controllers/authController");

const {
  verifyAccessToken,
  passwordCheck,
} = require("../middleware/middleware");

router.post("/auth/login", login);
router.post("/auth/register", passwordCheck, register);
router.get("/auth/verify-token", verifyAccessToken, verifyToken);
router.post("/auth/verify-email", verifyEmailExists);
router.post("/auth/send-reset-code", sendResetCode);
router.post("/auth/reset-password", passwordCheck, resetPassword);
router.post("/auth/delete-account", verifyAccessToken, deleteAccount);

module.exports = router;
