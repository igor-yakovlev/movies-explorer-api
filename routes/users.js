const express = require('express');
const auth = require('../middlewares/auth');

const {
  getUserInfo,
  updateUser,
  createUser,
  login,
} = require('../controllers/users');
const {
  validLogin,
  validCreateUser,
  validUpdateUser,
} = require('../middlewares/requestValid');

const userRouter = express.Router();

userRouter.post('/signin', validLogin, login);
userRouter.post('/signup', validCreateUser, createUser);
userRouter.use(auth);
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', validUpdateUser, updateUser);

module.exports = userRouter;
