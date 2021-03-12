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
    link: Joi.string().required().min(2),
    image: Joi.string().required().pattern(/^(?! )http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/)
  }),
}), createArticles);

routerArticles.delete('/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), deleteArticles);



module.exports = routerArticles;
