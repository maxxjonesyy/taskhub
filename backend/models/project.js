const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  tasks: [taskSchema],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
