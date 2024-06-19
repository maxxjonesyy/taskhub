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

    await project.deleteOne();
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
    res.status(200).json({ data: project });
  } catch (error) {
    res.status(500).json({ data: Project.name });
  }
};

const createTask = async (req, res) => {
  try {
    const { projectId, openedTask } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ error: "Error creating task, project not found" });
    }

    if (!openedTask.name) {
      return res.status(400).json({ error: "Task name is required" });
    }

    project.tasks.push(openedTask);
    await project.save();
    const createdTask = project.tasks[project.tasks.length - 1];

    res.status(200).json({ createdTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { projectId, openedTask } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ error: "Error editing task, project not found" });
    }

    if (!openedTask._id) {
      return res
        .status(400)
        .json({ error: "Error editing task, no task ID found" });
    }

    const taskIndex = project.tasks.findIndex(
      (task) => task._id.toString() === openedTask._id
    );

    if (project.tasks[taskIndex] === openedTask) {
      return;
    }

    project.tasks[taskIndex] = {
      ...project.tasks[taskIndex].toObject(),
      ...openedTask,
    };

    await project.save();

    res.status(200).json({ data: project.tasks[taskIndex] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }

    res.status(200).json({ data: project.tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { projectId, query } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }

    if (!query) {
      return res.status(400).json({ error: "Query not found" });
    }

    const queriedTasks = project.tasks.filter((task) =>
      task.name.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json({ queriedTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { projectId, task } = req.body;

    if (!projectId | !task._id) {
      return res
        .status(400)
        .json({ error: "Error deleting task, project or task id missing" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }

    const updatedTasks = project.tasks.filter(
      (t) => t._id.toString() !== task._id
    );

    project.tasks = updatedTasks;
    await project.save();

    res.status(200).json({ data: updatedTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  renameProject,
  deleteProject,
  createTask,
  editTask,
  getTasks,
  searchTasks,
  deleteTask,
};
