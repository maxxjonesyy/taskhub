const Project = require("../models/project");
const User = require("../models/user");

const createProject = async (req, res) => {
  try {
    const { projectName, id } = req.body;
    const user = await User.findOne({ _id: id });

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!projectName) {
      return res.status(400).json({ error: "Project name is required" });
    }

    if (projectName.length < 3) {
      return res
        .status(400)
        .json({ error: "Project name must be at least 3 characters long" });
    }

    if (projectName.length > 16) {
      return res
        .status(400)
        .json({ error: "Project name must be at most 24 characters long" });
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

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findOne({ _id: projectId });

    if (!projectId || !project) {
      return res.status(400).json({ error: "Error deleting project" });
    }

    await Project.deleteOne({ _id: projectId });
    const newProjectsArray = await Project.find({
      createdBy: project.createdBy,
    });
    res
      .status(200)
      .json({ data: newProjectsArray, message: `${project.name} was deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your project" });
  }
};

const getProjects = async (req, res) => {
  try {
    const id = req.params.userId;
    const projects = await Project.find({ createdBy: id });

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!projects) {
      return res.status(400).json({ error: "No projects found" });
    }

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const renameProject = async (req, res) => {
  try {
    const { projectId, projectName } = req.body;
    const project = await Project.findOne({ _id: projectId });

    if (!projectId || !project) {
      return res.status(400).json({ error: "Error updating project name" });
    }

    if (!projectName) {
      return res.status(400).json({ error: "Project name is required" });
    }

    if (projectName.length < 3) {
      return res
        .status(400)
        .json({ error: "Project name must be at least 3 characters long" });
    }

    if (projectName.length > 16) {
      return res
        .status(400)
        .json({ error: "Project name must be at most 16 characters long" });
    }

    project.name = projectName;
    await project.save();

    const newProjectsArray = await Project.find({
      createdBy: project.createdBy,
    });
    res.status(200).json({ data: newProjectsArray });
  } catch (error) {
    res.status(500).json({ data: Project.name });
  }
};

module.exports = { createProject, getProjects, renameProject, deleteProject };
