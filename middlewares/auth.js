const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизаиця'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизаиця'));
    return;
  }
  req.user = payload;
  next();
}

module.exports = auth;