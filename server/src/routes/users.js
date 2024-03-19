const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const cors = require('cors');

const corsOptions ={
    origin: 'http://localhost:5173'
};

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:user', cors(corsOptions), usersController.getUser);
usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;