const Project = require("../models/project");
const User = require("../models/user");

const createProject = async (req, res) => {
  try {
    const { projectName, id } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!projectName) {
      return res.status(400).json({ error: "Project name is required" });
    }

    const newProject = new Project({
      name: projectName,
      createdBy: id,
      tasks: [],
    });

    await newProject.save();

    res
      .status(200)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  const id = req.params.userId;
  const projects = await Project.find({ createdBy: id });

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!projects) {
    return res.status(400).json({ error: "No projects found" });
  }

  res.status(200).json({ projects });
};

module.exports = { createProject, getProjects };
