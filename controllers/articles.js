const Article = require('../models/articles');
const CustomError = require('../errors/customError');

module.exports.findArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((Articles) => res.status(200).send(Articles))
    .catch(next);
};

module.exports.createArticles = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    
     .then((article) => res.send({
      id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image
    }))
    
    
    .catch((err) => next(new CustomError(400, err.message)));
};



module.exports.deleteArticles = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
 .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        Article.deleteOne({ _id: req.params.id })
          .then((articleDel) => res.send(articleDel))
          .catch(next);
      } else {
        throw new CustomError(403, 'У вас нет прав на это действие'); 
      }
    })
    .catch(next);
};

