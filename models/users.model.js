const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  level: String,
  wrongLoginCount: Number,
  avatar: String
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User