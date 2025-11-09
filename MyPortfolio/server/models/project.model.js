const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);