const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname : String, 
  token: String,
  logo: { type: String,
    default: "/user.png"
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User;