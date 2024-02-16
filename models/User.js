const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    enum: ['admin', 'reader', 'creator'],
    default: 'reader',
    required: true,
  }
})

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;