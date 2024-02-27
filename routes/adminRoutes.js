const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Example route to get all admin users
router.get('/', authMiddleware, adminController.getAllAdminFunctionality);

router.route("/addBreed")
.post(adminController.createBreed)

router.route("/editBreed")
.put(adminController.updateBreed)

module.exports = router;
