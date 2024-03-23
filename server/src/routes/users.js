const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const middleware = require('../../utils/middleware');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173'
};

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:user', cors(corsOptions), usersController.getUser);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/:user', middleware.userExtractor, usersController.updateUser);

module.exports = usersRouter;