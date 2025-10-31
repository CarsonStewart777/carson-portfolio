const Contact = require('../models/Contact');

// GET all
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// GET by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// POST
exports.createContact = async (req, res) => {
    const { firstname, lastname, email } = req.body;

    try {
        const newContact = new Contact({
            firstname,
            lastname,
            email
        });

        const contact = await newContact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// PUT
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE one
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE all
exports.deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.json({ message: 'All contacts deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}