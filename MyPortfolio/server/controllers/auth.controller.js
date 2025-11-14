const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- User Registration ---
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create new user instance (password will be hashed by pre-save hook)
    user = new User({
      name,
      email,
      password,
      role: role || 'user', // Default to 'user' if role is not provided
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- User Login ---
exports.login = async (req, res) => {
  console.log('--- LOGIN ROUTE HIT ---'); // Diagnostic log
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      role: user.role,
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Token expires in 24 hours
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// --- Admin User Auto-Creation ---
exports.createAdminUser = async () => {
  try {
    // Check if any admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    // Create the new admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: 'Admin123!', // The pre-save hook will hash this
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully.');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
};
