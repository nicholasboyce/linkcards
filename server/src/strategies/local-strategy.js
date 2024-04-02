const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (!user) {
        const error = new Error('User not found');
        error.name = 'UserNotFoundError';
        done(error, null);
    } else {
        done(null, user);
    }
});

exports.localStrategy = passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username });
        const passwordCorrect = user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);
    
        if (!(user && passwordCorrect)) {
            const error = new Error('Invalid credentials');
            error.name = 'InvalidCredentialsError';
            done(error, null);
        } else {
            done(null, user);
        }
    })
);