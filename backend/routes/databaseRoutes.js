const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  renameProject,
  deleteProject,
} = require("../controllers/databaseController");

router.post("/api/create-project", createProject);
router.get("/api/get-projects/:userId", getProjects);
router.patch("/api/rename-project", renameProject);
router.post("/api/delete-project", deleteProject);

module.exports = router;
