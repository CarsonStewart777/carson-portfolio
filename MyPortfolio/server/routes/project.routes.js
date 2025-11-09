const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

// Public route for reading projects
router.get('/', projectController.getProjects);

// Protected routes for admin only
router.post('/', [verifyToken, isAdmin], projectController.createProject);
router.put('/:id', [verifyToken, isAdmin], projectController.updateProject);
router.delete('/:id', [verifyToken, isAdmin], projectController.deleteProject);

module.exports = router;