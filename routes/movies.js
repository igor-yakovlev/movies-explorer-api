const express = require('express');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validCreateMovie,
  validDeleteMovie,
} = require('../middlewares/requestValid');

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', validCreateMovie, createMovie);
movieRoutes.delete('/movies/:movieId', validDeleteMovie, deleteMovie);

module.exports = movieRoutes;
