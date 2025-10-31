const Project = require('../models/Project');

// GET all
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// GET by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// POST
exports.createProject = async (req, res) => {
    const { title, firstname, lastname, email, completion, description } = req.body;

    try {
        const newProject = new Project({
            title,
            firstname,
            lastname,
            email,
            completion,
            description
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// PUT
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE one
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE all
exports.deleteAllProjects = async (req, res) => {
    try {
        await Project.deleteMany();
        res.json({ message: 'All projects deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}