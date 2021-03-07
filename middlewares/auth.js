const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-key' } = process.env;


module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (e) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  
  }
  req.user = payload;
  next();
};





