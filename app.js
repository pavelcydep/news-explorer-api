require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const CustomError = require('./errors/customError');
const router = require('./routes/routerIndex');
const { PORT = 3000 } = process.env;
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');
const corsOptions = {
  origin: [
        'http://localhost:8080/',
        'http://pavlov-news.students.nomoreparties.xyz',
        'http://pavlov-news.students.nomoreparties.xyz',
        'http://api.pavlov-news.students.nomoreparties.xyz',
        'https://api.pavlov-news.students.nomoreparties.xyz',

        'http://pavelcydep.github.io/New-Explorer__frontend/',
        'https://pavelcydep.github.io/New-Explorer__frontend/'
],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'x-requested-with', 'origin','Access-Control-Allow-Origin', 'accept', 'x-access-token', 'Authorization'],
  credentials: true,
};
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors(corsOptions));
app.use(requestLogger);

app.use('/', router);
app.use(() => {
  throw new CustomError(404, 'Запрашиваемый ресурс не найден');
});
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
