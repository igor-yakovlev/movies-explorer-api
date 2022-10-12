require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/not-found-err');
const error = require('./middlewares/error');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors({ origin: ['http://localhost:4000'], credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такого запроса нет'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
