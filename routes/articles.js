const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findArticles, createArticles, deleteArticles,
} = require('../controllers/articles');

routerArticles.get('/', findArticles);

routerArticles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
    image: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/)
  }),
}), createArticles);

routerArticles.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), deleteArticles);


module.exports = routerArticles;
