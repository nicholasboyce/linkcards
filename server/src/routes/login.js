const loginRouter = require('express').Router();
const usersController = require('../controllers/users');

loginRouter.post('/', usersController.login);

module.exports = loginRouter;