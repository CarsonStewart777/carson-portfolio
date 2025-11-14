const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const { validate } = require('../middleware/validate');
const { check } = require('express-validator');

// All user routes are protected and admin-only
router.use(verifyToken, isAdmin);

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Update a user by ID
router.put(
  '/:id',
  [
    check('email').optional().isEmail().withMessage('Must be a valid email'),
    check('name').optional().not().isEmpty().withMessage('Name is required'),
    check('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
  ],
  validate,
  userController.updateUser
);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
