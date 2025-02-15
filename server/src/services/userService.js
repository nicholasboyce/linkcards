const bcrypt = require('bcrypt');
const User = require('../models/user');
const { randomNumber } = require('../../utils/randomNumber');

exports.login = async (user) => {
    return { username: user.username };
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
    const pictureUrl = `https://avatars.githubusercontent.com/u/${randomNumber()}`;

    const user = new User({
        username,
        passwordHash,
        picture: {
            url: pictureUrl,
            alt: `${username}'s profile picture`
        },
        data: inputData
    });

    const savedUser = await user.save();

    return { savedUser }
}

exports.getAllUsers = async () => {
    return await User.find({});
}

exports.getUser = async (username) => {
    const user = await User.findOne({username});
    if (user && !user.picture) {
        user.picture = {
            url: `https://avatars.githubusercontent.com/u/${randomNumber()}`,
            alt: `${username}'s profile picture`
        };
        await user.save();
    }
    return user;
}

exports.updateUser = async (agent, target, updatedInfo) => {
    if (agent && (agent.username.toString() === target.toString())) {
        agent.data = updatedInfo;
        await agent.save();
        return { updatedUser: agent }
    } else {
        return { updatedUser: null, error: 'Permission not granted' }
    }
}

exports.getUserStatus = async (agent) => {
    return agent ? true : false;
}