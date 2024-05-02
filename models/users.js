const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname : String, 
  logo : String,
  token: String,
  tweet : String
});

const User = mongoose.model('users', userSchema);

module.exports = User;