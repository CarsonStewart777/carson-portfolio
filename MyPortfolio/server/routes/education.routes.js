const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const { validate } = require('../middleware/validate');
const { check } = require('express-validator');

// GET /api/education - Get all education entries (Public)
router.get('/', educationController.getAllEducation);

// GET /api/education/:id - Get a single education entry by ID (Public)
router.get('/:id', educationController.getEducationById);

// POST /api/education - Create a new education entry (Admin only)
router.post(
  '/',
  [
    verifyToken,
    isAdmin,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
  ],
  validate,
  educationController.createEducation
);

// PUT /api/education/:id - Update an education entry (Admin only)
router.put(
  '/:id',
  [
    verifyToken,
    isAdmin,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
  ],
  validate,
  educationController.updateEducation
);

// DELETE /api/education/:id - Delete an education entry (Admin only)
router.delete('/:id', [verifyToken, isAdmin], educationController.deleteEducation);

module.exports = router;
