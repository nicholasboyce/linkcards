const { authenticate } = require('passport');
const userService = require('../services/userService');

exports.login = async (request, response) => {
  const { username } = await userService.login(request.user);

  if (!username) {
    return response.status(401).send({ error: 'Invalid credentials' });
  }

  response.status(200).send({ username });
}

exports.logout = async (request, response) => {
    request.logout(() => {
        response.redirect('/');
    });
}

exports.getAllUsers = async (request, response) => {
    const users = await userService.getAllUsers();
    response.json(users);
}

exports.getUser = async (request, response) => {
    const user = await userService.getUser(request.params.user);
    response.json(user);
}

exports.createUser = async (request, response) => {
    const { savedUser, error } = await userService.createUser(request.body);

    if (error) {
        return response.status(400).json({error});
    }

    response.status(201).json(savedUser);
}

exports.updateUser = async (request, response) => {
    const { updatedUser, error } = await userService.updateUser(request.user, request.params.user, request.body.data);

    if (error) {
        return response.status(401).json({error});
    }

    response.json(updatedUser);
}

exports.getUserStatus = async (request, response) => {
    const authenticated = await userService.getUserStatus(request.user);
    if (authenticated) {
        return response.status(200).json(request.user);
    }
    response.sendStatus(401);
}