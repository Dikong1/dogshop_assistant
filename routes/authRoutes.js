const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.redirect("login")
})


router.route('/login')
.get((req, res) => {
    res.render("login")
}) 
.post(authController.login);


router.route('/signup')
.get((req, res) => {
    res.render("signup")
})
.post(authController.signup);


router.route('/profile')
.get(authMiddleware, authController.getProfile)


router.post("/quit", authController.logout)


module.exports = router;
