const User = require('../models/userModel');
const Quiz = require('../models/quizModel');
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

  },
  getQuiz: async (req, res, next) => {
    try {
      const name = req.username;

      const quizQuestions = await Quiz.find();
      console.log(quizQuestions);

      res.render("quiz", {isLogged: req.cookies.token, loginName: name, quizQuestions, quizScore: undefined})
    } catch (error) {
      res.send("wrong Details");
      next(error);
    }

  },
  submitQuiz: async (req, res, next) => {
    try {
      const { body } = req;
      const quizQuestions = await Quiz.find();
      console.log("qq" + quizQuestions)
      // Initialize variables to track score and total questions
      let score = 0;
      const totalQuestions = Object.keys(body).filter(key => key.startsWith('answer')).length;

      // Iterate through the request body to calculate the score
      Object.keys(body).forEach(key => {
          if (key.startsWith('answer')) {
              // Check if the provided answer matches the correct answer
              const questionIndex = parseInt(key.replace('answer', ''), 10);
              const correctAnswer = quizQuestions[questionIndex].correctOption;

              if (body[key] === correctAnswer) {
                  score++;
              }
          }
      });

      // Calculate the percentage score
      const quizScore = (score / totalQuestions) * 100;

      const baseUrl = 'https://github.com/Dikong1/dogshop_assistant';

      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodeURIComponent(`I scored ${quizScore}% on the quiz!`)}`;
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(baseUrl)}&text=${encodeURIComponent(`I scored ${quizScore}% on the quiz!`)}`;
      const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}&title=${encodeURIComponent(`I scored ${quizScore}% on the quiz!`)}`;


      // Return the score to the user
      res.cookie('quiz_score', quizScore);
      res.render("quiz", {isLogged: req.cookies.token, loginName: req.username, quizQuestions, quizScore: quizScore, facebookShareUrl, twitterShareUrl, linkedinShareUrl});
    } catch (error) {
        next(error);
    }
  }
};

module.exports = authController;
