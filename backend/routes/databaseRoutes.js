const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  renameProject,
  deleteProject,
  createTask,
  editTask,
  getTasks,
  searchTasks,
  deleteTask,
} = require("../controllers/databaseController");

router.post("/api/create-project", createProject);
router.get("/api/get-projects/:userId", getProjects);
router.put("/api/rename-project", renameProject);
router.post("/api/delete-project", deleteProject);
router.post("/api/create-task", createTask);
router.put("/api/edit-task", editTask);
router.get("/api/get-tasks/:projectId", getTasks);
router.post("/api/delete-task", deleteTask);
router.get("/api/search-tasks/:projectId/:query", searchTasks);

module.exports = router;
