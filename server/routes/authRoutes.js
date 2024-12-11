// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getAllUsers } = require('../controllers/authController');  // Correct path to the controller

router.post('/register', register);
router.post('/login', authController.login);
router.get('/users', getAllUsers);  // Add this route to fetch all users

module.exports = router;
