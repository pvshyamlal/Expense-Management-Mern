const bcrypt = require('bcrypt');
const User = require('../models/User');  // Ensure this path is correct


// Add this function to your authcontroller.js to retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch users from the MongoDB database
    const users = await User.find();  // This fetches all users
    res.status(200).json(users);  // Respond with the users in JSON format
  } catch (error) {
    console.error('Error fetching users:', error.message);  // Log the error for debugging
    res.status(500).json({ message: `Error fetching users: ${error.message}` });  // Send error response
  }
};

// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token and send it as a response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};