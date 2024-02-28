const express = require('express');
const axios = require('axios');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.redirect("login")
})


router.route('/login')
.get(async (req, res) => {
    const response = await axios.get('https://dogapi.dog/api/v2/facts');
    
    const fact = response.data.data[0].attributes.body;
    
    res.render("login", { fact: fact });
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
