const express = require('express');
const User = require('../models/User'); // Replace with the actual User model
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'id name'); // Fetch only required fields
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
