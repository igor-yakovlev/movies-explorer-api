const user = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/not-found-err');

const getUserInfo = async (req, res, next) => {
  try {
    const data = await user.findById(req.user._id);
    res.send(data);
  } catch (e) {
    next(e);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const {
      name,
      email
    } = req.body
    const data = await user.findByIdAndUpdate(req.user._id, {
      name,
      email
    }, {
      new: true,
      runValidators: true
    }, );
    if (!data) {
      throw new NotFoundError('Пользователь с таким _id не найден')
    }
    res.send(data)
  } catch (e) {
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
};