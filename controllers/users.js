const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customError');
const User = require('../models/user');

let JWT_SECRET;

if (process.env.NODE_ENV !== 'production') {
  JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'dev-key';
} else {
  JWT_SECRET = process.env.JWT_SECRET;
}

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};


module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
       
        sameSite: false
      });
     res.send({ message: 'Успешная авторизация' });
    
    })
    .catch(next);
};





