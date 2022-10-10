const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id
    const data = await movie.find({owner});
    res.send(data);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const data = await movie.create({...req.body, owner});
    res.status(201).send(data);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
      return;
    }
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    console.log(req.params);
    const currentMovie = await movie.findById(req.params.movieId);
    if (!currentMovie) {
      throw new NotFoundError('Передан несуществующий _id фильма');
    }
    if (req.user._id !== currentMovie.owner.toString()) {
      throw new ForbiddenError('Отказано в доступе');
    }
    const data = await movie.findByIdAndRemove(req.params.movieId);
    res.send(data);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};