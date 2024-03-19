const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return { username: null, token: null, error: 'invalid username or password' };
    }

    const userInfo = user.username;

    const userClaims = {
        username: userInfo,
        id: user._id
    }

    const token = jwt.sign(userClaims, process.env.SECRET);

    return { username: userInfo, token };
}

exports.createUser = async ({ username, password, data }) => {
    if (!username || !password) {
        return { savedUser: null, error: 'username and password are required' };
    }

    if (username.length < 3 || password.length < 3) {
        return { savedUser: null, error: 'username and password must be at least 3 characters' };
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const inputData = data ? data : {};

    const user = new User({
        username,
        passwordHash,
        data: inputData
    });

    const savedUser = await user.save();

    return { savedUser }
}

exports.getAllUsers = async () => {
    return await User.find({}).populate('data');
}

exports.getUser = async (username) => {
    return await User.findOne({username}).populate('data');
}