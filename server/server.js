// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
