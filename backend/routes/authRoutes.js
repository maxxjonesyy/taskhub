const express = require("express");
const router = express.Router();
const { Login, Register } = require("../controllers/authController");

router.post("/api/login", Login);
router.post("/api/register", Register);

module.exports = router;
