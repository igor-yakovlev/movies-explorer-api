const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  ObjectId
} = require('mongoose').Types;
const validator = require('validator');


const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Поле thumbnail заполнено некорректно')
}

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
        .required()
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
        .custom(validateUrl),
      trailerLink: Joi.string()
        .required()
        .custom(validateUrl),
      thumbnail: Joi.string()
        .required()
        .custom(validateUrl),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
      movieId: Joi.number()
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