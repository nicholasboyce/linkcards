const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
}

exports.logout = async (request, response) => {

}

exports.getAllUsers = async (request, response) => {
    let users = await User.find({}).populate('blogs', { url:1, title:1, author:1 });
    response.json(users);
}

exports.createUser = async (request, response) => {
    const { username, name, password } = request.body;

    if (username.length < 3 || password.length < 3) {
        return response.status(400).send({error: 'username and password must be at least 3 characters'});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
}