const mongoose = require('mongoose');

const twitSchema = mongoose.Schema({
  twit: String,
  date: Date,
  liked: [String],
  hashtag: String,
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

const Twit = mongoose.model('twits', twitSchema);

module.exports = Twit