const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
  name: String,
  number: Number,
  
});

const Hashtag = mongoose.model('tweets', hashtagSchema);

module.exports = Hashtag;


