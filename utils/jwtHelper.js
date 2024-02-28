const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

// This jwt stuff is so annoying :(

module.exports = { generateToken, verifyToken };