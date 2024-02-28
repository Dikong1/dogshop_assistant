const User = require('../models/userModel');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtHelper');

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

      const token = generateToken({ user: { name: user.name, isAdmin: user.isAdmin } });
      res.cookie('token', token);


      res.redirect('/breeds');
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
  getProfile: async (req, res, next) => {
    try {
      const name = req.username;

      res.render("profile", {isLogged: req.cookies.token, loginName: name})
    } catch (error) {
      res.send("wrong Details");
      next(error);
    }

  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie('token');
      res.username = '';
      res.isAdmin = false;

      res.render("profile", {isLogged: false, loginName: res.username})
    } catch (error) {
      res.send("error log outing");
      next(error);
    }

  }
};

module.exports = authController;
