const Contact = require('../models/contact.model');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error creating contact.' });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error retrieving contacts.' });
  }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).send({ message: 'Contact not found.' });
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error updating contact.' });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).send({ message: 'Contact not found.' });
    }
    res.status(200).send({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error deleting contact.' });
  }
};