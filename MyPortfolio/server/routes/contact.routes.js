const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { validate } = require('../middleware/validate');
const { check } = require('express-validator');

// POST /api/contact - Submit a contact message (Public)
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  validate,
  contactController.createContactMessage
);

// --- Admin Routes for Managing Messages ---
const { verifyToken, isAdmin } = require('../middleware/authJwt');

// GET /api/contact - Get all contact messages (Admin only)
router.get('/', [verifyToken, isAdmin], contactController.getAllContactMessages);

// GET /api/contact/:id - Get a single message by ID (Admin only)
router.get('/:id', [verifyToken, isAdmin], contactController.getContactMessageById);

// DELETE /api/contact/:id - Delete a message by ID (Admin only)
router.delete('/:id', [verifyToken, isAdmin], contactController.deleteContactMessage);

module.exports = router;
