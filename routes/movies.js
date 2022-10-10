const express = require('express');
const {celebrate, Joi} = require('celebrate');
const {ObjectId} = require('mongoose').Types;
const regExpLink = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpLink),
    trailerLink: Joi.string().required().pattern(regExpLink),
    thumbnail: Joi.string().required().pattern(regExpLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    moviedId: Joi.number().required(),
  }),
}), createMovie);
movieRoutes.delete('/movies/:movieId', celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid')
      }
      return value;
    }),
  }),
}), deleteMovie);

module.exports = movieRoutes;