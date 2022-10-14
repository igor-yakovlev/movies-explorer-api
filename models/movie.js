const mongoose = require('mongoose');
const {
  regExpLink
} = require('../utils/constants');

const shema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
  director: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле является обязательным'],
  },
  year: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле является обязательным'],
    validate: {
      validator: (v) => regExpLink.test(v),
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле является обязательным'],
    validate: {
      validator: (v) => regExpLink.test(v),
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле является обязательным'],
    validate: {
      validator: (v) => regExpLink.test(v),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле является обязательным'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле является обязательным'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
});

module.exports = mongoose.model('movie', shema);