const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
} = require("../controllers/databaseController");

router.post("/api/create-project", createProject);
router.get("/api/get-projects/:userId", getProjects);

module.exports = router;
