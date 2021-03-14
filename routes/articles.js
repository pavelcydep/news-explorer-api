const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findArticles, createArticles, deleteArticles,
} = require('../controllers/articles');

routerArticles.get('/', findArticles);

routerArticles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required()
  })
}), createArticles);

routerArticles.delete('/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), deleteArticles);


module.exports = routerArticles;
