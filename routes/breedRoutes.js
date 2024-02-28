const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');

// rendering /breed
router.get('/', breedController.renderCarousel);

router.route('/updateCarousel')
.post(breedController.fetchAndSaveImages)

module.exports = router;
