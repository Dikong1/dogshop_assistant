const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, adminController.getAllAdminFunctionality);

// Creating
router.route("/addBreed")
.post(adminController.createBreed)

// Updating
router.post("/editBreed", adminController.updateBreed)

router.post("/addBreedImage", adminController.addBreedImage)

router.post("/addRandomImage", adminController.addRandomImage)

// Deleting
router.post("/deleteBreed", adminController.deleteBreed)

module.exports = router;
