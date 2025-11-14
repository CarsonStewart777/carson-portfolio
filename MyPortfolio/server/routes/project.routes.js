const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { verifyToken } = require('../middleware/authJwt');
const { validate } = require('../middleware/validate');
const { check } = require('express-validator');

// GET /api/projects - Get all projects (Public)
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get a single project by ID (Public)
router.get('/:id', projectController.getProjectById);

// POST /api/projects - Create a new project (Protected)
router.post(
  '/',
  [
    verifyToken,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  validate,
  projectController.createProject
);

// PUT /api/projects/:id - Update a project (Protected)
router.put(
  '/:id',
  [
    verifyToken,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  validate,
  projectController.updateProject
);

// DELETE /api/projects/:id - Delete a project (Protected)
router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;
