const usersRouter = require('express').Router();
const { validateData } = require('../../utils/middleware');
const usersController = require('../controllers/users');
const cors = require('cors');
const { newUserSchema, userUpdateSchema } = require('../schemas/userSchemas');

const corsOptions = {
    origin: 'http://localhost:5173'
};

// usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/status', cors(corsOptions), usersController.getUserStatus);
usersRouter.get('/:user', cors(corsOptions), usersController.getUser);
usersRouter.post('/', validateData(newUserSchema), usersController.createUser);
usersRouter.patch('/:user', validateData(userUpdateSchema), usersController.updateUser);

module.exports = usersRouter;