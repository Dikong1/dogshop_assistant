const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to check if a JWT token is provided and valid
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user.isAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
