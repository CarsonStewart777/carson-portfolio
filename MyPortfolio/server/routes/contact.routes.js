const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

router.route('/')
  .get([verifyToken, isAdmin], contactController.getContacts)
  .post([verifyToken, isAdmin], contactController.createContact);

router.route('/:id')
  .put([verifyToken, isAdmin], contactController.updateContact)
  .delete([verifyToken, isAdmin], contactController.deleteContact);

module.exports = router;