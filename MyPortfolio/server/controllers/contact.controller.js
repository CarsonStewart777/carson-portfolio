const ContactMessage = require('../models/contact.model');

// --- Create a new contact message (Public) ---
exports.createContactMessage = async (req, res) => {
  try {
    const newMessage = new ContactMessage({ ...req.body });
    const message = await newMessage.save();
    res.status(201).json({ msg: 'Message sent successfully!', message });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Get all contact messages (Admin only) ---
exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Get contact message by ID (Admin only) ---
exports.getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server error');
  }
};

// --- Delete a contact message (Admin only) ---
exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    await message.remove();
    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server error');
  }
};
