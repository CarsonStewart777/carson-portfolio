const Education = require('../models/education.model');

// --- Create a new education entry (Admin only) ---
exports.createEducation = async (req, res) => {
  try {
    const newEducation = new Education({ ...req.body });
    const education = await newEducation.save();
    res.status(201).json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Get all education entries (Public) ---
exports.getAllEducation = async (req, res) => {
  try {
    const educationEntries = await Education.find().sort({ year: -1 });
    res.json(educationEntries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Get education entry by ID (Public) ---
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ msg: 'Education entry not found' });
    }
    res.json(education);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Education entry not found' });
    }
    res.status(500).send('Server error');
  }
};

// --- Update an education entry (Admin only) ---
exports.updateEducation = async (req, res) => {
  try {
    let education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ msg: 'Education entry not found' });
    }

    education = await Education.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Delete an education entry (Admin only) ---
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ msg: 'Education entry not found' });
    }

    await education.remove();
    res.json({ msg: 'Education entry removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Education entry not found' });
    }
    res.status(500).send('Server error');
  }
};
