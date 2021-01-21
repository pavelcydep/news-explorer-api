const Article = require('../models/articles');
const CustomError = require('../errors/customError');



module.exports.findArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((Articles) => res.status(200).send(Articles))
    .catch(next);
};

module.exports.createArticles = (req, res, next) => {
  const {  keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((card) => {
      Article.findById(card._id).populate(['owner'])
        .orFail(new CustomError(404, 'Данного id нет в базе'))
        .then((createArticles) => {
          res.status(200).send(createArticles);
        });
    }).catch((err) => next(new CustomError(400, err.message)));

  };
  module.exports.deleteArticles = (req, res, next) => {
    Article.findById(req.params.id).populate(['owner'])
      .orFail(new CustomError(404, 'Данного id нет в базе'))
      .then((article) => {
        if (article.owner._id.toString() === req.user._id.toString()) {
          article.deleteOne().then((deletedArticle) => {
            res.status(200).send({
              _id: deletedArticle._id,
              keyword: deletedArticle.keyword,
              title: deletedArticle.title,
              text: deletedArticle.text,
              date: deletedArticle.date,
              source: deletedArticle.source,
              link: deletedArticle.link,
              image: deletedArticle.image,
            });
          });
        } else {
          throw new CustomError(403, 'У вас нет прав на это действие');
        }
      })
      .catch(next);
  };

