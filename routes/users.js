const {celebrate, Joi} = require('celebrate');
const express = require('express');

const {
  getUserInfo,
  updateUser,
  createUser,
  login
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
  }),
}), createUser);
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);



module.exports = userRouter;