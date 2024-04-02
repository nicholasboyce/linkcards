const loginRouter = require('express').Router();
const usersController = require('../controllers/users');
const passport = require('passport');

loginRouter.post('/', passport.authenticate('local'), usersController.login);

module.exports = loginRouter;