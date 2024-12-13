const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Auth routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://pvshyamlal4:dxrjVfJFiEw9LHff@financialplannercluster.7sg2d.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
