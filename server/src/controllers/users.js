const userService = require('../services/userService');

exports.login = async (request, response) => {
  const { username } = await userService.login(request.user);

  if (!username) {
    return response.sendStatus(401);
  }

  response.status(200).send({ username });
}

exports.logout = async (request, response) => {
    response
        .status(404);
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