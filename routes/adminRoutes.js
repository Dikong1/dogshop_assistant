const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Example route to get all admin users
router.get('/', authMiddleware, adminController.getAllAdminFunctionality);

// Creating
router.route("/addBreed")
.post(adminController.createBreed)

// Updating
router.post("/editBreed", adminController.updateBreed)

router.post("/addBreedImage", adminController.addBreedImage)

router.post("/addRandomImage", adminController.addRandomImage)

router.post("/deleteBreed", adminController.deleteBreed)

module.exports = router;
