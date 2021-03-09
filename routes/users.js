

const router = require('express').Router();
const { getUserById, createUser, login } = require('../controllers/users');
const auth = require('../middlewars/auth');



router.get('/users/me', auth, getUserById);



router.post('/signup',  createUser);
router.post('/signin',  login);

module.exports = routerUsers;


