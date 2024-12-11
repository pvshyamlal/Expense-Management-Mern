const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  }
});

// You may want to hash the password before saving, though it's already being hashed in the controller during registration
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
