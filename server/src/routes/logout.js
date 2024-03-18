const logoutRouter = require('express').Router();
const usersController = require('../controllers/users');

logoutRouter.post('/', usersController.logout);

module.exports = logoutRouter;