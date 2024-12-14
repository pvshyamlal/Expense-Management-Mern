const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Ensure this path is correct

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Entered Password:', password); // Debugging line
    const newUser = new User({
      username,
      email,
      password, // Save the plain-text password directly
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
