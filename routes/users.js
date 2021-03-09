const routerUsers = require('express').Router();

const {
  getUserById,
} = require('../controllers/users');

const auth = require('../middlewars/auth');
routerUsers.get('/users/me', auth, getUserById);
module.exports = routerUsers;


