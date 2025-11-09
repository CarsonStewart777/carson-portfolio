const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

// Public route for reading education entries
router.get('/', educationController.getEducation);

// Protected routes for admin only
router.post('/', [verifyToken, isAdmin], educationController.createEducation);
router.put('/:id', [verifyToken, isAdmin], educationController.updateEducation);
router.delete('/:id', [verifyToken, isAdmin], educationController.deleteEducation);

module.exports = router;