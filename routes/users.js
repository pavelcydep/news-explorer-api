const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
   getUserById
} = require('../controllers/users');

routerUsers.get('/me',getUserById );

module.exports = routerUsers;