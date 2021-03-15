const routerArticles = require('express').Router();

const {
  findArticles, createArticles, deleteArticles,
} = require('../controllers/articles');

routerArticles.get('/', findArticles);


routerArticles.post('/', createArticles);

routerArticles.delete('/:id', deleteArticles);

routerArticles.delete('/:id', deleteArticles);

module.exports = routerArticles;
