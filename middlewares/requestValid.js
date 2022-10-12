const {
  celebrate,
  Joi,
} = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const regExpLink = require('../utils/constants');

const validLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

const validCreateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      name: Joi.string()
        .min(2)
        .max(30),
      password: Joi.string()
        .required(),
    }),
});

const validUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
    }),
});

const validCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .required()
        .pattern(regExpLink),
      trailerLink: Joi.string()
        .required()
        .pattern(regExpLink),
      thumbnail: Joi.string()
        .required()
        .pattern(regExpLink),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
      moviedId: Joi.number()
        .required(),
    }),
});

const validDeleteMovie = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
          }
          return value;
        }),
    }),
});

module.exports = {
  validLogin,
  validCreateUser,
  validUpdateUser,
  validCreateMovie,
  validDeleteMovie,
};
