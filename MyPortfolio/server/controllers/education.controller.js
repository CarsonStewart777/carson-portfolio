const Education = require('../models/education.model');

// Create a new education entry
exports.createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).send(education);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error creating education entry.' });
  }
};

// Get all education entries
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find({});
    res.status(200).send(education);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error retrieving education entries.' });
  }
};

// Update an education entry by ID
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!education) {
      return res.status(404).send({ message: 'Education entry not found.' });
    }
    res.status(200).send(education);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error updating education entry.' });
  }
};

// Delete an education entry by ID
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).send({ message: 'Education entry not found.' });
    }
    res.status(200).send({ message: 'Education entry deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error deleting education entry.' });
  }
};