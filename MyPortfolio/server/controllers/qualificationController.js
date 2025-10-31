const Qualification = require('../models/Qualification');

// GET all
exports.getQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find();
        res.json(qualifications);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// GET by ID
exports.getQualificationById = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// POST
exports.createQualification = async (req, res) => {
    const { title, firstname, lastname, email, completion, description } = req.body;

    try {
        const newQualification = new Qualification({
            title,
            firstname,
            lastname,
            email,
            completion,
            description
        });

        const qualification = await newQualification.save();
        res.status(201).json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// PUT
exports.updateQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE one
exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndDelete(req.params.id);
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json({ message: 'Qualification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE all
exports.deleteAllQualifications = async (req, res) => {
    try {
        await Qualification.deleteMany();
        res.json({ message: 'All qualifications deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}