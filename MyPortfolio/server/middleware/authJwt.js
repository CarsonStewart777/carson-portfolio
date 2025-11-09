const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.authUserId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.authUserId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).send({ message: 'Require Admin Role!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error checking admin role.' });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt;