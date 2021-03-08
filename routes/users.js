const routerUsers = require('express').Router();

const {
  getUserById,
} = require('../controllers/users');

routerUsers.get('/me',auth, getUserById);

module.exports = routerUsers;


