const Project = require('../models/project.model');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error creating project.' });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error retrieving projects.' });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).send({ message: 'Project not found.' });
    }
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error updating project.' });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).send({ message: 'Project not found.' });
    }
    res.status(200).send({ message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error deleting project.' });
  }
};