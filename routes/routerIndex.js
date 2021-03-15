const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const articles = require('./articles');
const users = require('./users');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', login);

router.post('/signup',createUser);

router.use('/articles',  auth, articles);

router.use('/users', users);

module.exports = router;
