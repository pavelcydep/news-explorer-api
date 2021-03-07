const MONGODB = process.env.MONGODB || 'mongodb://localhost:27017/mestodb' ;
const JWT_SECRET = (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-key';
const PORT = process.env.PORT || 3000;
module.exports = {
  MONGODB,
  JWT_SECRET,
  PORT
};