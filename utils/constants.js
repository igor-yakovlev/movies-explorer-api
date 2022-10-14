const regExpLink = /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/;
const mongoUrl = 'mongodb://localhost:27017/moviesdb';
const jwtSecret = 'dev-secret';


module.exports = {
  regExpLink,
  mongoUrl,
  jwtSecret,
};
