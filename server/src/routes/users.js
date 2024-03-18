const usersRouter = require('express').Router();
const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;