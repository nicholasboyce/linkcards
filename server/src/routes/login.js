const loginRouter = require('express').Router();
const usersController = require('../controllers/users');
const passport = require('passport');
require('../strategies/local-strategy');


loginRouter.post('/', passport.authenticate('local'), usersController.login);

module.exports = loginRouter;