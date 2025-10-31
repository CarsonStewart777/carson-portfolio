const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET all
exports.getUsers = async (req, res) => { 
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// GET by ID
exports.getUserById = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// POST
exports.createUser = async (req, res) => { 
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// PUT
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE one
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE all
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.json({ message: 'All users deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}