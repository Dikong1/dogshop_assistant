const User = require('../models/userModel');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtHelper');

// Controller for authentication operations
const authController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({name: username});
      if(!user) {
        res.send("Username not found");
        return;
      }

      const match = await comparePasswords(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Incorrect Password' });
      }

      const token = generateToken({ user: { isAdmin: user.isAdmin } });
      // Set the token as a cookie
      res.cookie('token', token);


      // Redirect to the home page or dashboard
      res.redirect('/breeds');
      console.log("login token: " + token)
    } catch (error) {
      res.send("wrong Details");
      next(error);
    }

  },
  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({name: username});
      if(user) {
        res.send("User already exists. Try to be creative with username!");
        return;
      }

      const hashedPassword = await hashPassword(password);
      const data = {
        name: username,
        password: hashedPassword,
        isAdmin: false
      };
      const userData = User.insertMany(data);
      console.log("User added:" + userData)
      res.redirect('/login');
    } catch (error) {
      res.send("wrong Details");
      next(error);
    }

  },
};

module.exports = authController;
