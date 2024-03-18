const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = async ({ username, password }) => {

    const user = await User.findOne({ username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return { username: null, token: null };
    }

    const userClaims = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userClaims, process.env.SECRET);

    return { user, token };
}