const {celebrate, Joi} = require('celebrate');
const express = require('express');

const {
  getUserInfo,
  updateUser
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);



module.exports = userRouter;