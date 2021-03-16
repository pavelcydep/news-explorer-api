const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  link: {
      type: String,
      validate: {
        validator: (link) => validator.isURL(link),
      },
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: (link) => validator.isURL(link),
      },
      required: true,
    },

  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },

}, { versionKey: false });

module.exports = mongoose.model('articles', articleSchema);
