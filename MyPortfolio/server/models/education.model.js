const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Education', EducationSchema);