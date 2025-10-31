const express = require('express');
const router = express.Router();
const {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} = require('../controllers/qualificationController');

router.route('/')
  .get(getQualifications)
  .post(createQualification)
  .delete(deleteAllQualifications);

router.route('/:id')
  .get(getQualificationById)
  .put(updateQualification)
  .delete(deleteQualification);

module.exports = router;