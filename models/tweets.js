const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  tweet: String,
  data: Date,
  liked: Number,
  hashtag: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;