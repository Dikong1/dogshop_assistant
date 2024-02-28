const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');

// rendering /breed
router.get('/', breedController.renderCarousel);

router.post('/updateCarousel', breedController.fetchAndSaveImages)

module.exports = router;
