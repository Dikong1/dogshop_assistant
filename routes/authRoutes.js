const express = require('express');
const axios = require('axios');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const Fact = require('../models/factModel');

router.get('/', (req, res) => {
    res.redirect("login")
})


router.route('/login')
.get(async (req, res) => {
    const response = await axios.get('https://dogapi.dog/api/v2/facts');
    
    const fact = response.data.data[0].attributes.body;

    const existingFact = await Fact.findById('65dfc10c776c6a5ebea7131b');

    if (existingFact) {
    existingFact.fact.push(fact);
    await existingFact.save();
    } else {
    await Fact.insertMany([{ fact }]);
    }

    const randomFact = await Fact.aggregate([{ $sample: { size: 1 } }]);

    const factToDisplay = randomFact[0].fact[0];
    
    // add this if you want random fact from database
    // res.render("login", { fact: randomFact }); 

    // add this to get random fact directly from api which has bigger data
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
