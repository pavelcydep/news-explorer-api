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



module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .orFail()
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        Article.deleteOne({ _id: req.params.id })
          .then((articleDel) => res.send(articleDel))
          .catch(next);
      } else {
        
      }
    })
    .catch(next);
};

