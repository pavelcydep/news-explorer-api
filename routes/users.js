const routerUsers = require('express').Router();

const {
  getUserById,
} = require('../controllers/users');

routerUsers.get('/', getUserById);

module.exports = routerUsers;


