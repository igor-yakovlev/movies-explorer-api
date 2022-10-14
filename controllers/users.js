const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const user = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const { jwtSecret } = require('../utils/constants');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await user.create({
      email,
      name,
      password: hashedPassword,
    });
    res.status(201)
      .send({
        data,
      });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
      return;
    }
    if (e.code === 11000) {
      next(new ConflictError('Такой пользователь уже существует'));
      return;
    }
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const data = await user.findOne({ email });
    if (!data) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const comparePasswords = await bcrypt.compare(password, data.password);
    if (comparePasswords) {
      const token = jwt.sign({ _id: data._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtSecret, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({
        _id: data,
        token,
      });
    } else {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
  } catch (e) {
    next(e);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const data = await user.findById(req.user._id);
    res.send(data);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
    } = req.body;

    const data = await user.findByIdAndUpdate(req.user._id, {
      name,
      email,
    }, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      throw new NotFoundError('Пользователь с таким _id не найден');
    }
    res.send(data);
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError('Такой пользователь уже существует'));
      return;
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
      return;
    }
    if (e.name === 'CastError') {
      next(new NotFoundError('Пользователь с таким _id не найден'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  login,
};
