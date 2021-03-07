const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const articles = require('./articles');
const users = require('./users');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin',  login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(3),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2),
  }),
}), createUser);

router.use('/articles', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth, articles);

router.use('/users',
   users);

module.exports = router;

