const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  fieldOfStudy: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Education', EducationSchema);
