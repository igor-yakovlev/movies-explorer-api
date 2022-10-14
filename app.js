require('dotenv').config();
const helmet = require("helmet");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  errors
} = require('celebrate');
const cors = require('cors');
const error = require('./middlewares/error');
const {
  errorLogger,
  requestLogger
} = require('./middlewares/logger');
const router = require('./routes/index');
const {
  mongoUrl
} = require('./utils/constants');
const { limiter } = require('./middlewares/rateLimit');

const {
  PORT = 3000, NODE_ENV, MONGO_DB_URL
} = process.env;

const app = express();
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_URL : mongoUrl, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: ['http://localhost:4000', 'https://igor.yakovlev.nomoredomains.icu/'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});