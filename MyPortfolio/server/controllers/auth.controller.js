const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Bcrypt hash for "Admin123!"
const ADMIN_PASSWORD_HASH = '$2b$08$mLNayBW5cpck/13o5Suqfel14bljNLeSlxsdkymhEXje/EiTOTzti';

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordIsValid = await user.comparePassword(password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error during signin.' });
  }
};

exports.signout = (req, res) => {
  res.status(200).send({ message: 'Signed out successfully!' });
};

// Function to create admin user if not exists
exports.createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@portfolio.com',
        password: ADMIN_PASSWORD_HASH, // Use the pre-generated hash
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};