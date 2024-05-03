const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
  name: String,
  twits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'twits'}],
});

const Hashtag = mongoose.model('hashtags', hashtagSchema);

module.exports = Hashtag;


