// breedRoutes.js

const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');

// Route to render all breeds
router.get('/', breedController.renderAllBreeds);



module.exports = router;
