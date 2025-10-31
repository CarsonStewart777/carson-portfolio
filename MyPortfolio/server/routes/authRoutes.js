const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;