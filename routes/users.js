
const routerUsers = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUserById,
} = require('../controllers/users');

routerUsers.get('/me',auth, getUserById);

module.exports = routerUsers;
