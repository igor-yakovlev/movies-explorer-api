const express = require('express');
const NotFoundError = require('../errors/not-found-err');

const defaultRoute = express.Router();

defaultRoute.all('*', (req, res, next) => {
  next(new NotFoundError('Такого запроса нет'));
});

module.exports = defaultRoute;