const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const cors = require('cors');
// const passport = require('passport');
// require('../strategies/local-strategy');

const corsOptions = {
    origin: 'http://localhost:5173'
};

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:user', cors(corsOptions), usersController.getUser);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/:user', usersController.updateUser);

module.exports = usersRouter;