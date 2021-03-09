const router= require('express').Router();

const {
  getUserById,
} = require('../controllers/users');

const auth = require('../middlewars/auth');
router.get('/users/me', auth, getUserById);
module.exports = routerUsers;


