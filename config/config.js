require('dotenv').config();

module.exports = {
  // MongoDB connection string
  mongoURI: process.env.MONGO_URI,

  // JWT secret key
  jwtSecret: process.env.JWT_SECRET
};

// I`m dead if in the midnight submission i will forget to share .env with teacher